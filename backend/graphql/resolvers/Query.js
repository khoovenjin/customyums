import { graphQL as middlewareGraphQL } from "../../middleware/index.js";

export const QueryResolver = {
  dietaries: async ( parent, args, { cache, controllers, serviceWorker }) => {
    return await serviceWorker.fetchResponse(
      async () => await cache.fetchDietaries(),
      async ( data ) => await cache.storeDietariesExpire( data ),
      async () => await controllers.DietaryController.apiGetDietaries()
    ).catch( error => console.log(`Unable to execute serviceWorker.`) );
  },
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
  pantries: async ( parent, args, { cache, controllers, serviceWorker }) => {
    return await serviceWorker.fetchResponse(
      async () => await cache.fetchPantries(),
      async ( data ) => await cache.storePantriesExpire( data ),
      async () => await controllers.PantryController.apiGetPantries()
    ).catch( error => console.log(`Unable to execute serviceWorker.`) );
  },
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
  users: async ( parent, args, { cache, controllers, serviceWorker }) => {
    return await serviceWorker.fetchResponse(
      async () => await cache.fetchUsers(),
      async ( data ) => await cache.storeUsersExpire( data ),
      async () => await controllers.UserController.apiGetUsers()
    ).catch( error => console.log(`Unable to execute serviceWorker.`) );
  },
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