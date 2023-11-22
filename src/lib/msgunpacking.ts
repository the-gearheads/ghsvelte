import { decode } from "@msgpack/msgpack";
import crc32 from "$lib/crc32";
import type Data from "$lib/data";

export class MsgDecoder {
  public numSegments: number = -1;
  public numSegmentsScanned: number = 0;
  public segments: (Uint8Array|undefined)[] = [];
  private statusCallback: ((status: string) => {}) | undefined;

  public ingestQr(data: Uint8Array) {
    if (this.numSegments === -1) {
      this.numSegments = data[0];
      this.segments = new Array(this.numSegments);
    } else if (this.numSegments !== data[0]) {
      if(this.statusCallback) this.statusCallback(`Segment count mismatch; ${this.numSegments} !== ${data[0]}`);
      return;
    }

    const segmentNumber = data[1];
    if (segmentNumber >= this.numSegments) {
      if(this.statusCallback) this.statusCallback(`Segment number too high; ${segmentNumber} >= ${this.numSegments}`);
      return;
    }

    const segment = data.slice(2, data.length - 4);
    const crc = data.slice(data.length - 4);
    const calculatedCrc = crc32(data.slice(0, data.length - 4));
    const crcMatches = crc.every((v, i) => v === calculatedCrc[i])

    if (!crcMatches) {
      if(this.statusCallback) this.statusCallback(`CRC mismatch ${crc} !== ${calculatedCrc}. Try scanning again.`);
      return;
    }

    if (this.segments[segmentNumber]) {
      if(this.statusCallback) this.statusCallback(`Segment ${segmentNumber} already scanned`);
      return;
    }

    if(this.statusCallback) this.statusCallback(`Segment ${segmentNumber + 1} of ${this.numSegments} scanned`);
    this.segments[segmentNumber] = segment;
    this.numSegmentsScanned++;
  }

  public registerStatusCallback(callback: (status: string) => {}) {
    if (this.statusCallback) {
      throw new Error("Status callback already registered");
    }
    this.statusCallback = callback;
  }

  public allSegmentsScanned(): boolean {
    return this.segments.every((segment) => segment !== undefined);
  }

  public assembleAndDecode(): Data | undefined {
    if (!this.allSegmentsScanned()) {
      if(this.statusCallback) this.statusCallback(`Not all segments scanned; ${this.numSegmentsScanned} !== ${this.numSegments}`);
      return undefined;
    }
    const segments = this.segments as Uint8Array[];

    const encoded = new Uint8Array(segments.reduce((acc, segment) => acc + segment.length, 0));
    let offset = 0;
    for (const segment of segments) {
      encoded.set(segment, offset);
      offset += segment.length;
    }

    const decoded = decode(encoded);
    return decoded as Data;
  }
}