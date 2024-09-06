import { encode } from "@msgpack/msgpack";
import { QR_CODE_MAX_DATA, SEGMENT_SIZE, HEADER_LENGTH, CRC_LENGTH } from "./msgconsts";
import crc32 from "./crc32";
import hex from "./hex";
// @ts-ignore
import lzma from "lzma/src/lzma_worker.js"; /* no ts imports and this library is literally 11 years old */
import type QRDataType from "$lib/data/collectedData";

export function encodeAndSegment(data: QRDataType) {
  let encoded = encode(data);
  console.log("[msgpacking] DATA PRE COMPRESSION");
  console.log(`orig length: ${encoded.length}, segment size: ${SEGMENT_SIZE}`);
  console.log(encoded);

  console.log("[msgpacking] LZMA funcs:")
  console.log(lzma);

  // @ts-ignore
  encoded = lzma.compress(encoded, 9);

  // first byte is amount of codes, second byte is current code number, length of actual data (32bit), then segment things up if encoded length > 1538-2, then a crc32 at the end
  console.log("[msgpacking] POST COMPRESSION");
  console.log(`new length: ${encoded.length}, segment size: ${SEGMENT_SIZE}`);
  console.log(encoded);
  const segments = Math.ceil(encoded.length / SEGMENT_SIZE);

  let out = [];
  for (let i = 0; i < segments; i++) {
    const segmentPayload = encoded.slice(i * SEGMENT_SIZE, (i + 1) * SEGMENT_SIZE);
    console.log(i, segmentPayload.length, i * SEGMENT_SIZE, (i + 1) * SEGMENT_SIZE);

    const segment = new Uint8Array(QR_CODE_MAX_DATA);
    segment[0] = segments;

    segment[1] = i;
    segment[2] = (segmentPayload.length >> 24) & 0xff;
    segment[3] = (segmentPayload.length >> 16) & 0xff;
    segment[4] = (segmentPayload.length >> 8) & 0xff;
    segment[5] = segmentPayload.length & 0xff;
    segment.set(segmentPayload, HEADER_LENGTH);

    const crc = crc32(segment.slice(0, segment.length - CRC_LENGTH));
    console.log(i, crc, hex(crc))
    segment.set(crc, segment.length - CRC_LENGTH);
    console.log(hex(segment))
    out.push(segment);
  }

  return out;
}

