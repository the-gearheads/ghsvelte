//export const QR_CODE_MAX_DATA = 1538; // version 32-Q
export const QR_CODE_MAX_DATA = 287; // 12-M
export const HEADER_LENGTH = 6;
export const CRC_LENGTH = 4;
export const SEGMENT_SIZE = QR_CODE_MAX_DATA - HEADER_LENGTH - CRC_LENGTH;
