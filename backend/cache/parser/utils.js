import { payloadChecker } from "../../middleware/payloadChecker.js";
import keyParser from "./keys.js";

export default class parser {
  static serialize = ( data ) => JSON.stringify( data )
  
  static deserialize = ( data ) => JSON.parse( data )

  static parseArray = ( data ) => Array.isArray( data )? data : new Array([ data ])

  static parseArrayKey = ( entity, data ) => this.parseArray( data ).map( item => keyParser.initKey( entity ).add( item ).get() )
  
  static isSerialize = ( data ) =>  {
    let value = typeof data !== "string"? JSON.stringify( data ) : data;

    try {
      value = JSON.parse( value );
    } catch( error ){
      return false;
    }

    return typeof value === "object" && value !== null;
  }

  static serializePropsOfArray = ( data ) => {
    if( payloadChecker.typeChecker( true, data, 'object' ) ) return data;

    for( const [ key, value ] of Object.entries( data ) )
      if( payloadChecker.typeChecker( false, value, 'array' ) || ( payloadChecker.typeChecker( false, value, 'object' ) && Object.keys( value ).length ) ) data[ key ] = this.serialize( value )

    return data;
  }

  static deserializeProps = ( data ) => {
    if( payloadChecker.typeChecker( true, data, 'object' ) ) return data;

    for( const [ key, value ] of Object.entries( data ) )
      if( this.isSerialize( value ) ) data[ key ] = this.deserialize( value )

    return data;
  }
}