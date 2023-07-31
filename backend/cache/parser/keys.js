import { payloadChecker } from "../../middleware/payloadChecker.js";

export default class keyParser {
  static #seperator = new String(':');

  static #collection = Object.freeze({
    user: 'user',
    pantry: 'pantry',
    dietary: 'dietary'
  });

  static createKey = ( key ) => {
    if( payloadChecker.typeChecker( true, key.data, 'string' ) )
      throw new Error('Invalid key data-type. Recommend to call initKey().')

    const parentKey = key;

    // Get Key
    parentKey.get = () => parentKey.data;

    // To concatenate a new index
    parentKey.add = ( childKey ) => {
      const newKey = {
        data: String( parentKey.data ).concat( this.#seperator ).concat( childKey )
      };
      
      return this.createKey( newKey );
    }

    return parentKey;
  }

  static initKey = ( collection ) => {
    if(!( collection in this.#collection )) throw new Error('Invalid collection name!');

    return this.createKey( { data: this.#collection[ collection ] } );
  }
}