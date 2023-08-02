import { payloadChecker } from "../../middleware/payloadChecker.js";
import parser from "../parser/utils.js";

export class ServiceWorker {
  static #bufferTime = 500 // 500ms

  // Check CacheMiss
  static isCacheMiss = ( cache ) => {
    if( payloadChecker.typeChecker( false, cache, 'null' )) return true;

    return false;
  }

  // Check CacheHit
  static isCacheHit = ( cache ) => {
    if(( payloadChecker.typeChecker( true, cache, 'object' ) && payloadChecker.typeChecker( true, cache, 'null' ) ) || ( payloadChecker.typeChecker( false, cache, 'object' ) && Object.keys( cache ).length ))
      return true;
    
    return false;
  }


  // Caching Consistency Algorithm - Double Delete ( https://yunpengn.github.io/blog/2019/05/04/consistent-redis-sql/ )

  // Immutable Operations - GET (args: async Fx, async Fx, async Fx)
  static fetchResponse = async ( fetchCache, storeCache, getDatabaseData ) => {
    const cache = await fetchCache();

    // Cache Hit
    if( this.isCacheHit( cache ) ) return parser.deserializeProps( cache )

    // Cache Miss
    const data = await getDatabaseData();
    
    // If ID non-existence, return
    if( payloadChecker.typeChecker( false, data, 'null' ) ) return;
    
    await storeCache( parser.serializePropsOfArray( data ) );
    
    return parser.deserializeProps( data );
  }

  // Mutable Operations - CREATE, UPDATE, DELETE (args: async Fx, async Fx, async Fx)
  static mutateDatabase = async ( deleteCache, updateDatabase ) => {
    // Delete entry in Redis
    await deleteCache();

    // CREATE, UPDATE, DELETE in Database
    const result = await updateDatabase();

    // Sleep system (500ms) -> Delete entry in Redis again
    if( payloadChecker.typeChecker( false, result, 'modified', true ) || payloadChecker.typeChecker( true, result, 'null' ) )
        setTimeout( async () => await deleteCache(), this.#bufferTime )

    return result;
  }
}