export const UserResolver = {
  dietaries: async ({ dietaries }, args, { cache, controllers, serviceWorker }) => {
    if( !dietaries || !dietaries.length ) return new Array();

    return await Promise.all(
      dietaries.map(
        async ({ dietary_id }) => {
          const id = dietary_id.toString();

          const req = {
            params: {
              id
            }
          };

          return await serviceWorker.fetchResponse(
            async () => await cache.fetchDietary( id ),
            async ( data ) => cache.storeDietaryExpire( id, data ),
            async () => await controllers.DietaryController.apiGetDietariesById( req ).then( res => res.at( 0 ) )
          );
        }
      )
    );
  },
  pantries: async ({ pantries }, args, { cache, controllers, serviceWorker }) => {
    if( !pantries || !pantries.length ) return new Array();

    return await Promise.all(
      pantries.map(
        async ({ pantry_id }) => {
          const id = pantry_id.toString();

          const req = {
            params: {
              id
            }
          };

          return await serviceWorker.fetchResponse(
            async () => await cache.fetchPantry( id ),
            async ( data ) => cache.storePantryExpire( id, data ),
            async () => await controllers.PantryController.apiGetPantriesById( req ).then( res => res.at( 0 ) )
          );
        }
      )
    );
  }
}