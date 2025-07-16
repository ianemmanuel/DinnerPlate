// utils/bank/encryption.ts
import Cryptr from 'cryptr';

const SECRET = process.env.ACCOUNT_ENCRYPTION_KEY
if (!SECRET) {
  throw new Error('DATA_SECRET env variable is missing');
}

/**
 * Cryptr wraps Node’s AES‑256‑GCM with:
 *  • random IV per call
 *  • SHA‑256 key derivation (so the secret can be any length)
 *  • base64‑encoded payload that fits in a varchar/text column
 */
const cryptr = new Cryptr(SECRET)

export const encrypt = (plain: string): string => cryptr.encrypt(plain);
export const decrypt = (cipher: string): string => cryptr.decrypt(cipher);
