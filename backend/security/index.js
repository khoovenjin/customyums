import { createHash } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export default class Security {
  static #HASH_ALGO = 'sha256';
  static #DIGEST_ALGO = 'hex';

  static postfixSalt = ( variable ) => String( variable ).concat( process.env.SALT_KEY );

  static hash = ( variable ) => createHash( this.#HASH_ALGO ).update( this.postfixSalt( variable ) ).digest( this.#DIGEST_ALGO );
}