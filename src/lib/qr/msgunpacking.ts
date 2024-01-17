import { decode } from "@msgpack/msgpack";
import { SEGMENT_SIZE, HEADER_LENGTH, CRC_LENGTH } from "./msgconsts";
import crc32 from "./crc32";
import hex from "./hex";
import type Data from "$lib/data/collectedData";

export class MsgDecoder {
  public numSegments: number = -1;
  public numSegmentsScanned: number = 0;
  public segments: (Uint8Array|undefined)[] = [];
  private statusCallback: ((status: string) => void) | undefined;

  public ingestQr(data: Uint8Array): boolean {

    const crc = data.slice(data.length - CRC_LENGTH);
    const calculatedCrc = crc32(data.slice(0, data.length - CRC_LENGTH));
    const crcMatches = crc.every((v, i) => v === calculatedCrc[i])

    if (!crcMatches) {
      if(this.statusCallback) this.statusCallback(`CRC mismatch ${hex(crc)} !== ${hex(calculatedCrc)}. Try scanning again.`);
      return false;
    }

    if (this.numSegments === -1) {
      this.numSegments = data[0];
      this.segments = new Array(this.numSegments);
    } else if (this.numSegments !== data[0]) {
      if(this.statusCallback) this.statusCallback(`Segment count mismatch; ${this.numSegments} !== ${data[0]}`);
      return false;
    }

    const segmentNumber = data[1];
    if (segmentNumber >= this.numSegments) {
      if(this.statusCallback) this.statusCallback(`Segment number too high; ${segmentNumber} >= ${this.numSegments}`);
      return false;
    }

    const segmentLength = (data[2] << 24) | (data[3] << 16) | (data[4] << 8) | data[5];
    console.log("segment length is " + segmentLength)
    if (segmentLength > SEGMENT_SIZE) {
      if(this.statusCallback) this.statusCallback(`Segment length implausible; ${segmentLength} > ${SEGMENT_SIZE}`);
      return false;
    }

    const segment = data.slice(HEADER_LENGTH, segmentLength + HEADER_LENGTH);

    if (this.segments[segmentNumber]) {
      if(this.statusCallback) this.statusCallback(`Segment ${segmentNumber} already scanned`);
      return false;
    }

    if(this.statusCallback) this.statusCallback(`Segment ${segmentNumber + 1} of ${this.numSegments} scanned`);
    this.segments[segmentNumber] = segment;
    this.numSegmentsScanned++;
    return true;
  }

  public registerStatusCallback(callback: (status: string) => void) {
    if (this.statusCallback) {
      throw new Error("Status callback already registered");
    }
    this.statusCallback = callback;
  }

  public allSegmentsScanned(): boolean {
    return this.numSegmentsScanned === this.numSegments;
  }

  public assembleAndDecode(): Data | undefined {
    if (!this.allSegmentsScanned()) {
      if(this.statusCallback) this.statusCallback(`Not all segments scanned; ${this.numSegmentsScanned} !== ${this.numSegments}`);
      return undefined;
    }
    const segments = this.segments as Uint8Array[];

    const encoded = new Uint8Array(segments.reduce((acc, segment) => acc + segment.length, 0));
    console.log(encoded.length)
    let offset = 0;
    for (const segment of segments) {
      encoded.set(segment, offset);
      console.log(offset);
      offset += segment.length;
    }

    const decoded = decode(encoded);
    return decoded as Data;
  }
}