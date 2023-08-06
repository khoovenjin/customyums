import { graphQL as middlewareGraphQL } from "../../middleware/index.js";

export const QueryResolver = {
  dietaries: middlewareGraphQL.validateReqQuery( 'dietary' ).createResolver( async ( parent, { query }, { cache, controllers, serviceWorker }) => {
    const req = {
      query
    };

    // return await serviceWorker.fetchResponse(
    //   async () => await cache.fetchDietaries(),
    //   async ( data ) => await cache.storeDietariesExpire( data ),
    //   async () => await controllers.DietaryController.apiGetDietaries( req )
    // ).catch( error => console.log(`Unable to execute serviceWorker.`) );

    return await controllers.DietaryController.apiGetDietaries( req );
  }),
  dietary: middlewareGraphQL.validateReqParamsId.createResolver( async ( parent, { id }, { cache, controllers, serviceWorker }) => {
    const req = {
      params: {
        id
      }
    }

    return await serviceWorker.fetchResponse(
      async () => await cache.fetchDietary( id ),
      async ( data ) => await cache.storeDietaryExpire( id, data ),
      async () => await controllers.DietaryController.apiGetDietariesById( req ).then( res => res.at( 0 ) )
    ).catch( error => console.log(`Unable to execute serviceWorker.`) );
  }),
  pantries: middlewareGraphQL.validateReqQuery( 'pantry' ).createResolver( async ( parent, { query }, { cache, controllers, serviceWorker }) => {
    const req = {
      query
    };

    // return await serviceWorker.fetchResponse(
    //   async () => await cache.fetchPantries(),
    //   async ( data ) => await cache.storePantriesExpire( data ),
    //   async () => await controllers.PantryController.apiGetPantries( req )
    // ).catch( error => console.log(`Unable to execute serviceWorker.`) );

    return await controllers.PantryController.apiGetPantries( req );
  }),
  pantry: middlewareGraphQL.validateReqParamsId.createResolver( async ( parent, { id }, { cache, controllers, serviceWorker }) => {
    const req = {
      params: {
        id
      }
    }

    return await serviceWorker.fetchResponse(
      async () => await cache.fetchPantry( id ),
      async ( data ) => await cache.storePantryExpire( id, data ),
      async () => await controllers.PantryController.apiGetPantriesById( req ).then( res => res.at( 0 ) )
    ).catch( error => console.log(`Unable to execute serviceWorker.`) );
  }),
  users: middlewareGraphQL.validateReqQuery( 'user' ).createResolver( async ( parent, { query }, { cache, controllers, serviceWorker }) => {
    const req = {
      query
    };

    // return await serviceWorker.fetchResponse(
    //   async () => await cache.fetchUsers(),
    //   async ( data ) => await cache.storeUsersExpire( data ),
    //   async () => await controllers.UserController.apiGetUsers( req )
    // ).catch( error => console.log(`Unable to execute serviceWorker.`) );

    return await controllers.UserController.apiGetUsers( req );
  }),
  user: middlewareGraphQL.validateReqParamsId.createResolver( async ( parent, { id }, { cache, controllers, serviceWorker }) => {
    const req = {
      params: {
        id
      }
    }

    return await serviceWorker.fetchResponse(
      async () => await cache.fetchUser( id ),
      async ( data ) => await cache.storeUserExpire( id, data ),
      async () => await controllers.UserController.apiGetUsersById( req ).then( res => res.at( 0 ) )
    ).catch( error => console.log(`Unable to execute serviceWorker.`) );
  })
};