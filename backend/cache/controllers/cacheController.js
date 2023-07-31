import parser from "../parser/utils.js";
import keyParser from '../parser/keys.js';

export default class Cache {
  // Applies to: 
  // 1) User
  // 2) Pantry
  // 3) Dietary
  #expireTime = 180; // 3 minutes
  
  #type_commands = {
    string: {
      set: async ( key, value ) => await this.redis.set( key, value ), //
      multiSet: async ( hashMap ) => await this.redis.mset( hashMap ), //
      get: async ( key ) => await this.redis.get( key ), //
      multiGet: async ( ...args ) => await this.redis.mget( ...args ), //
      isExist: async ( key ) => await this.redis.exists( key ) //
    },
    list: {
      lpush: async ( key, value ) => await this.redis.lpush( key, parser.parseArray( value ) ), //
      softLPush: async ( key, value ) => await this.redis.lpushx( key, value ),
      rpush: async ( key, value ) => await this.redis.rpush( key, value ),
      softRPush: async ( key, value ) => await this.redis.rpushx( key, value ),
      get: async ( key ) => await this.redis.lrange( key, 0, -1 ), //
      getIndex: async ( key, index ) => await this.redis.lindex( key, index ),
      length: async ( key ) => await this.redis.llen( key ),
      lpop: async ( key ) => await this.redis.lpop( key ), //
      rpop: async ( key ) => await this.redis.rpop( key ),
      replace: async ( key, index, value ) => await this.redis.lset( key, index, value )
    },
    set: {
      add: async ( key, value ) => await this.redis.sadd( key, parser.parseArray( value ) ), //
      get: async ( key ) => await this.redis.smembers( key ),
      count: async ( key ) => await this.redis.scard( key ), //
      isMember: async ( key, member ) => await this.redis.sismember( key, member ) //
    },
    sortedSet: {
      add: async ( key, score, value, ...args ) => await this.redis.zadd( key, score, value, ...args ), //
      get: async ( key ) => await this.redis.zrange( key, 0, -1 ), //
      getScore: async ( key, member ) => await this.redis.zscore( key, member ),
      count: async ( key ) => await this.redis.zcount( key, '-inf', '+inf' ),
      delete: async ( key, member ) => await this.redis.zrem( key, member ),
      deleteByScore: async ( key, score ) => await this.redis.zremrangebyscore( key, score, score )
    },
    hash: {
      set: async ( key, hashMap ) => await this.redis.hset( key, hashMap ), //
      softSet: async ( key, hashKey, hashValue ) => await this.redis.hsetnx( key, hashKey, hashValue ), //
      get: async ( key ) => await this.redis.hgetall( key ), //
      isExist: async ( key, hashKey ) => await this.redis.hexists( key, hashKey ), //
      keys: async ( key ) => await this.redis.hkeys( key ),
      values: async ( key ) => await this.redis.hvals( key ),
      length: async ( key ) => await this.redis.hlen( key ),
      delete: async ( key, hashKey ) => await this.redis.hdel( key, parser.parseArray( hashKey ) ) //
    },
    utilities: {
      expire: async ( key, duration ) => await this.redis.expire( key, duration ), //
      setExpire: async ( key, value, duration ) => await this.redis.set( key, value, "EX", duration ), //
      ttl: async ( key ) => await this.redis.ttl( key ), //
      delete: async ( key ) => await this.redis.del( parser.parseArray( key ) ) //
    }
  }

  constructor( redis ) {
    this.redis = redis;
  }

  // User
  fetchUsers = async () => await this.#type_commands.string.get( keyParser.initKey( 'user' ).get() ).then( result => parser.deserialize( result ) );
  fetchUser = async ( id ) => await this.#type_commands.hash.get( keyParser.initKey( 'user' ).add( id ).get() );
  storeUsers = async ( user ) => await this.#type_commands.string.set( keyParser.initKey( 'user' ).get(), parser.serialize( user ) );
  storeUser = async ( id, user ) => await this.#type_commands.hash.set( keyParser.initKey( 'user' ).add( id ).get(), user );
  storeUsersExpire = async ( user, duration = this.#expireTime ) => await this.#type_commands.utilities.setExpire( keyParser.initKey( 'user' ).get(), parser.serialize( user ), duration );
  storeUserExpire = async ( id, user, duration = this.#expireTime ) => await this.#type_commands.hash.set( keyParser.initKey( 'user' ).add( id ).get(), user )
                                                                  .then( async () => await this.#type_commands.utilities.expire( keyParser.initKey( 'user' ).add( id ).get(), duration ));
  deleteUsers = async () => await this.#type_commands.utilities.delete( keyParser.initKey( 'user' ).get() );
  deleteUser = async ( id ) => await this.#type_commands.utilities.delete( parser.parseArrayKey( 'user', id ) );

  // Pantry
  fetchPantries = async () => await this.#type_commands.string.get( keyParser.initKey( 'pantry' ).get() ).then( result => parser.deserialize( result ) );
  fetchPantry = async ( id ) => await this.#type_commands.hash.get( keyParser.initKey( 'pantry' ).add( id ).get() );
  storePantries = async ( pantry ) => await this.#type_commands.string.set( keyParser.initKey( 'pantry' ).get(), parser.serialize( pantry ) );
  storePantry = async ( id, pantry ) => await this.#type_commands.hash.set( keyParser.initKey( 'pantry' ).add( id ).get(), pantry );
  storePantriesExpire = async ( pantry, duration = this.#expireTime ) => await this.#type_commands.utilities.setExpire( keyParser.initKey( 'pantry' ).get(), parser.serialize( pantry ), duration );
  storePantryExpire = async ( id, pantry, duration = this.#expireTime ) => await this.#type_commands.hash.set( keyParser.initKey( 'pantry' ).add( id ).get(), pantry )
                                                                      .then( async () => await this.#type_commands.utilities.expire( keyParser.initKey( 'pantry' ).add( id ).get(), duration ));
  deletePantries = async () => await this.#type_commands.utilities.delete( keyParser.initKey( 'pantry' ).get() );
  deletePantry = async ( id ) => await this.#type_commands.utilities.delete( parser.parseArrayKey( 'pantry', id ) );

  // Dietary
  fetchDietaries = async () => await this.#type_commands.string.get( keyParser.initKey( 'dietary' ).get() ).then( result => parser.deserialize( result ) );
  fetchDietary = async ( id ) => await this.#type_commands.hash.get( keyParser.initKey( 'dietary' ).add( id ).get() );
  storeDietaries = async ( dietary ) => await this.#type_commands.string.set( keyParser.initKey( 'dietary' ).get(), parser.serialize( dietary ) );
  storeDietary = async ( id, dietary ) => await this.#type_commands.hash.set( keyParser.initKey( 'dietary' ).add( id ).get(), dietary );
  storeDietariesExpire = async ( dietary, duration = this.#expireTime ) => await this.#type_commands.utilities.setExpire( keyParser.initKey( 'dietary' ).get(), parser.serialize( dietary ), duration );
  storeDietaryExpire = async ( id, dietary, duration = this.#expireTime ) => await this.#type_commands.hash.set( keyParser.initKey( 'dietary' ).add( id ).get(), dietary )
                                                                              .then( async () => await this.#type_commands.utilities.expire( keyParser.initKey( 'dietary' ).add( id ).get(), duration ));
  deleteDietaries = async () => await this.#type_commands.utilities.delete( keyParser.initKey( 'dietary' ).get() );
  deleteDietary = async ( id ) => await this.#type_commands.utilities.delete( parser.parseArrayKey( 'dietary', id ) );
}