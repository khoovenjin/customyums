export const PantryResolver = {
  user: async ({ user_id }, args, { cache, controllers, serviceWorker }) => {
    const req = {
      params: {
        id: user_id
      }
    }

    return await serviceWorker.fetchResponse(
      async () => await cache.fetchUser( user_id ),
      async ( data ) => cache.storeUserExpire( user_id, data ),
      async () => await controllers.UserController.apiGetUsersById( req ).then( res => res.at( 0 ) )
    );
  }
}