import type Data from "./data";
import { encodeAndSegment } from "./msgpacking"
import { MsgDecoder } from "./msgunpacking"

const randomLongString = function () {
  let out = "";
  for (let i = 0; i < 4000; i++) {
    out += String.fromCharCode(Math.floor(Math.random() * 94 + 32));
  }
  return out;
}()

describe("QR Message Packing", () => {
  it("Short encode/decode", () => {
    const encoded = encodeAndSegment({"stTest": "This is a test."} as Data)
    expect(encoded.length).toBe(1);

    
    const decoder = new MsgDecoder();
    decoder.registerStatusCallback((str: string) => {
      console.log("Decoder status: " + str);
    });
    expect(decoder.allSegmentsScanned()).toBe(false);
    expect(decoder.numSegments).toBe(-1);
    expect(decoder.numSegmentsScanned).toBe(0);
    decoder.ingestQr(encoded[0]);
    expect(decoder.allSegmentsScanned()).toBe(true);
    expect(decoder.numSegments).toBe(1);
    expect(decoder.numSegmentsScanned).toBe(1);
    const decoded = decoder.assembleAndDecode();
    expect(decoded).not.toBe(undefined);
    expect(decoded?.stTest).toBe("This is a test.");
  })


  it("Long encode/decode", () => {
    const encoded = encodeAndSegment({"stTest": randomLongString} as Data)
    expect(encoded.length).toBe(3);

    
    const decoder = new MsgDecoder();
    decoder.registerStatusCallback((str: string) => {
      console.log("Decoder status: " + str);
    });
    expect(decoder.allSegmentsScanned()).toBe(false);
    expect(decoder.numSegments).toBe(-1);
    expect(decoder.numSegmentsScanned).toBe(0);
    decoder.ingestQr(encoded[0]);
    expect(decoder.allSegmentsScanned()).toBe(false);
    decoder.ingestQr(encoded[1]);
    decoder.ingestQr(encoded[2]);
    expect(decoder.allSegmentsScanned()).toBe(true);
    expect(decoder.numSegments).toBe(3);
    expect(decoder.numSegmentsScanned).toBe(3);
    const decoded = decoder.assembleAndDecode();
    expect(decoded).not.toBe(undefined);
    expect(decoded?.stTest).toBe(randomLongString);
  })

})