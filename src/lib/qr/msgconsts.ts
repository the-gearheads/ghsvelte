import type { QRCodeErrorCorrectionLevel } from "qrcode";

export const QR_CODE_VERSION = 12;
export const QR_CODE_ERROR_CORRECTION: QRCodeErrorCorrectionLevel = "M";

// consult https://www.qrcode.com/en/about/version.html for this:
// export const QR_CODE_MAX_DATA = 1112; // version 32-Q
export const QR_CODE_MAX_DATA = 287; // 12-M
export const HEADER_LENGTH = 6; // # segments (1byte), segment number (1byte), segment length (4byte)
export const CRC_LENGTH = 4; // footer for the data, just 32 bits
export const SEGMENT_SIZE = QR_CODE_MAX_DATA - HEADER_LENGTH - CRC_LENGTH;
