const QR_CODE_MAX_DATA = 1538; // version 32-Q

import { encode } from "@msgpack/msgpack";
import crc32 from "$lib/crc32"
import type Data from "$lib/data";

function hex(arrayBuffer: Uint8Array)
{
    return Array.prototype.map.call(
        new Uint8Array(arrayBuffer),
        n => n.toString(16).padStart(2, "0")
    ).join("");
}

export function encodeAndSegment(data: Data) {
  const encoded = encode(data);

  // first byte is amount of codes, second byte is current code number,then segment things up if encoded length > 1538-2, then a crc32 at the end
  const segmentSize = QR_CODE_MAX_DATA - 2 - 4;
  console.log(encoded.length, segmentSize);
  const segments = Math.ceil(encoded.length / segmentSize);

  let out = [];
  for (let i = 0; i < segments; i++) {
    const segment = encoded.slice(i * segmentSize, (i + 1) * segmentSize);
    console.log(i, segment.length, i * segmentSize, (i + 1) * segmentSize);
    const segmentBuffer = new Uint8Array(segmentSize + 2 + 4);
    segmentBuffer[0] = segments;
    segmentBuffer[1] = i;
    segmentBuffer.set(segment, 2);
    const crc = crc32(segmentBuffer.slice(0, segmentBuffer.length - 4));
    console.log(i, crc, hex(crc))
    segmentBuffer.set(crc, segmentBuffer.length - 4);
    console.log(hex(segmentBuffer))
    out.push(segmentBuffer);
  }

  return out;
}