import mongoose from "mongoose";

import { payloadChecker } from "../middleware/payloadChecker.js";

export default class dbQuery{
  static #data_types = {
    id: ( variable ) => this.toObjectId( variable ),
    date: ( variable ) => this.toDate( variable )
  }

  static createPipeline = ( pipeline ) => {
    if( payloadChecker.typeChecker( false, pipeline.data, 'null' ) )
      throw new Error('Invalid pipeline data-type. Recommend to call initPipeline().')

    const parentPipeline = pipeline;

    // Get Data
    parentPipeline.get = () => parentPipeline.data;

    // To filter data based on attribute value
    parentPipeline.match = ( attribute, value, isObjectId = false ) => {
      const matchQuery = {
        [ attribute ]: isObjectId? this.toObjectId( value ): value
      }
      
      parentPipeline?.data.push( matchQuery );

      return this.createPipeline( parentPipeline );
    }

    // To filter data based on Several Attribute value (Aggregate)
    parentPipeline.matchKeyPair = ( hashMap, attrFormatObj ) => {
      let matchQuery = new Object();

      for( const [ key, value ] of Object.entries( hashMap ) ) {
        let propsValue = value;

        if( key in attrFormatObj ) {
          if( attrFormatObj[ key ] in this.#data_types )
            propsValue = this.#data_types[ attrFormatObj[ key ] ]( value );
          else
            propsValue = value;
        }
        
        matchQuery[ key ] = propsValue;
      }
      
      parentPipeline?.data.push( matchQuery );
        
      return this.createPipeline( parentPipeline );
    }

    // To set attributes' value
    parentPipeline.set = ( setDoc ) => {
      const setQuery = {
        $set: setDoc
      }

      parentPipeline?.data.push( setQuery );

      return this.createPipeline( parentPipeline );
    }

    // To remove attributes from collection
    parentPipeline.unset = ( array ) => {
      const unsetObject = this.formatAttributes( array );
      const unsetQuery = {
        $unset: unsetObject
      }

      parentPipeline?.data.push( unsetQuery );

      return this.createPipeline( parentPipeline );
    }

    // To remove element from array in collection's attribute
    parentPipeline.pull = ( attribute, value, isObjectId = false ) => {
      const pullQuery = {
        $pull: {
          [ attribute ]: isObjectId? this.toObjectId( value ): value
        }
      }

      parentPipeline.data.push( pullQuery );

      return this.createPipeline( parentPipeline );
    }

    // To add element from array in collection's attribute
    parentPipeline.push = ( attribute, value, isObjectId = false ) => {
      const pushQuery = {
        $push: {
          [ attribute ]: isObjectId? this.toObjectId( value ): value
        }
      }

      parentPipeline.data.push( pushQuery );

      return this.createPipeline( parentPipeline );
    }

    return parentPipeline;
  }

  static initPipeline = () => this.createPipeline( { data: new Array() } );
  
  // Returns format of { attr1: 1, attr2: 1 }
  static formatAttributes = ( array ) => array.reduce( ( acc, item ) => ({ ...acc, [ item ]: 1 }), {} )

  // Convert to mongoDB ObjectId
  static toObjectId = ( data ) => new mongoose.Types.ObjectId( data )

  // Convert to mongoDB Date
  static toDate = ( data ) => new Date( data )
}