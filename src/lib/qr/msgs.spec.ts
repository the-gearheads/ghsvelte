import type Data from "../data/collectedData";
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
    const encoded = encodeAndSegment({"stTest": "This is a test."} as unknown as Data)
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
    expect((decoded as any)?.stTest).toBe("This is a test.");
  })


  it("Long encode/decode", () => {
    const encoded = encodeAndSegment({"stTest": randomLongString} as unknown as Data)

    const decoder = new MsgDecoder();
    decoder.registerStatusCallback((str: string) => {
      console.log("Decoder status: " + str);
    });

    decoder.ingestQr(encoded[0]);
    expect(decoder.allSegmentsScanned()).toBe(false);

    for(let i = 1; i < encoded.length; i++) {
      decoder.ingestQr(encoded[i]);
    }

    expect(decoder.numSegments).toBe(encoded.length);
    expect(decoder.numSegmentsScanned).toBe(encoded.length);
    expect(decoder.allSegmentsScanned()).toBe(true);

    const decoded = decoder.assembleAndDecode();
    expect(decoded).not.toBe(undefined);
    expect((decoded as any)?.stTest).toBe(randomLongString);
  })

  it("Short CRC fail", () => {
    const encoded = encodeAndSegment({"stTest": "This is a test."} as unknown as Data)

    const decoder = new MsgDecoder();
    decoder.registerStatusCallback((str: string) => {
      console.log("Decoder status: " + str);
    });

    encoded[0][20] = 0xFF;
    decoder.ingestQr(encoded[0]);

    expect(decoder.allSegmentsScanned()).toBe(false);
    expect(decoder.numSegments).toBe(-1);
    expect(decoder.numSegmentsScanned).toBe(0);

    const decoded = decoder.assembleAndDecode();

    expect(decoded).toBe(undefined);
  })

})