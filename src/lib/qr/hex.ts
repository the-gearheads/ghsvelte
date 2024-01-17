export default function hex(arrayBuffer: Uint8Array) {
  return Array.prototype.map.call(
    new Uint8Array(arrayBuffer),
    n => n.toString(16).padStart(2, "0")
  ).join("");
}