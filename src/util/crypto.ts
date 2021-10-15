/**
 * Hashes a value to SHA256.
 * 
 * @param value Value to hash
 * @returns SHA256 hashed value
 */
const sha256 = (value: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  return window.crypto.subtle.digest('SHA-256', data);
}

/**
 * Encodes a value in base64 (URL-encoded).
 * 
 * @param value Value to encode
 * @returns Encoded value
 */
const base64 = (value: ArrayBuffer) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(value) as unknown as number[])).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default {
  sha256, base64
}
