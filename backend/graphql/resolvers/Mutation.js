import { graphQL as middlewareGraphQL } from "../../middleware/index.js";

export const MutationResolver = {
  // Add Operators
  addDietary: middlewareGraphQL.validateReqPayload( 'dietary' ).createResolver( async ( parent, { input }, { cache, controllers, serviceWorker }) => {
    const req = {
      body: input
    };
    
    return await serviceWorker.mutateDatabase(
      async () => await cache.deleteDietaries(),
      async () => await controllers.DietaryController.apiAddDietary( req )
    );
  }),
  addPantry: middlewareGraphQL.validateReqPayload( 'pantry' ).createResolver( async ( parent, { input }, { cache, controllers, serviceWorker }) => {
    const req = {
      body: input
    };
    
    return await serviceWorker.mutateDatabase(
      async () => await cache.deletePantries(),
      async () => await controllers.PantryController.apiAddPantry( req )
    );
  }),
  addUser: middlewareGraphQL.validateReqPayload( 'user' ).createResolver( async ( parent, { input }, { cache, controllers, serviceWorker }) => {
    const req = {
      body: input
    };
    
    return await serviceWorker.mutateDatabase(
      async () => await cache.deleteUsers(),
      async () => await controllers.UserController.apiAddUser( req )
    );
  }),

  // Update Operations
  updateDietary: middlewareGraphQL.validateReqParamsId.createResolver( middlewareGraphQL.validateReqPayload( 'dietary' ) ).createResolver( async ( parent, { id, input }, { cache, controllers, middleware, serviceWorker }) => {
    const req = {
      params: {
        id
      },
      body: input
    }

    const updateStatus = await serviceWorker.mutateDatabase(
                        async () => await Promise.all([ await cache.deleteDietaries(), await cache.deleteDietary( id ) ]),
                        async () => await controllers.DietaryController.apiUpdateDietary( req )
                      );

    if( middleware.utils.typeChecker( true, updateStatus, 'modified', true ) )
      return false;

    return true;
  }),
  updatePantry: middlewareGraphQL.validateReqParamsId.createResolver( middlewareGraphQL.validateReqPayload( 'pantry' ) ).createResolver( async ( parent, { id, input }, { cache, controllers, middleware, serviceWorker }) => {
    const req = {
      params: {
        id
      },
      body: input
    }

    const updateStatus = await serviceWorker.mutateDatabase(
                        async () => await Promise.all([ await cache.deletePantries(), await cache.deletePantry( id ) ]),
                        async () => await controllers.PantryController.apiUpdatePantry( req )
                      );

    if( middleware.utils.typeChecker( true, updateStatus, 'modified', true ) )
      return false;

    return true;
  }),
  updateUser: middlewareGraphQL.validateReqParamsId.createResolver( middlewareGraphQL.validateReqPayload( 'user' ) ).createResolver( async ( parent, { id, input }, { cache, controllers, middleware, serviceWorker }) => {
    const req = {
      params: {
        id
      },
      body: input
    }

    const updateStatus = await serviceWorker.mutateDatabase(
                        async () => await Promise.all([ await cache.deleteUsers(), await cache.deleteUser( id ) ]),
                        async () => await controllers.UserController.apiUpdateUser( req )
                      );

    if( middleware.utils.typeChecker( true, updateStatus, 'modified', true ) )
      return false;

    return true;
  }),
    
  // Delete Operations
  deleteDietary: middlewareGraphQL.validateReqParamsId.createResolver( middlewareGraphQL.validateReqPayload( 'recipe' ) ).createResolver( async ( parent, { id, input }, { cache, controllers, middleware, serviceWorker }) => {
    const req = {
      params: {
        id
      },
      body: input
    }

    const deleteStatus = await serviceWorker.mutateDatabase(
                        async () => await Promise.all([ await cache.deleteDietaries(), await cache.deleteDietary( id ) ]),
                        async () => await controllers.DietaryController.apiDeleteDietary( req )
                      );

    if( middleware.utils.typeChecker( false, deleteStatus, 'null' ) )
      return false;

    return true;
  }),
  deletePantry: middlewareGraphQL.validateReqParamsId.createResolver( async ( parent, { id }, { cache, controllers, middleware, serviceWorker }) => {
    const req = {
      params: {
        id
      }
    }

    const deleteStatus = await serviceWorker.mutateDatabase(
                        async () => await Promise.all([ await cache.deletePantries(), await cache.deletePantry( id ) ]),
                        async () => await controllers.PantryController.apiDeletePantry( req )
                      );

    if( middleware.utils.typeChecker( false, deleteStatus, 'null' ) )
      return false;

    return true;
  }),
  deleteUser: middlewareGraphQL.validateReqParamsId.createResolver( async ( parent, { id }, { cache, controllers, middleware, serviceWorker }) => {
    const req = {
      params: {
        id
      }
    }

    const deleteStatus = await serviceWorker.mutateDatabase(
                        async () => await Promise.all([ await cache.deleteUsers(), await cache.deleteUser( id ) ]),
                        async () => await controllers.UserController.apiDeleteUser( req )
                      );

    if( middleware.utils.typeChecker( false, deleteStatus, 'null' ) )
      return false;

    return true;
  })
}