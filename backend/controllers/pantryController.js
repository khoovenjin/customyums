import PantryDAO from '../dao/pantryDAO.js';

import { payloadChecker } from '../middleware/payloadChecker.js';

export default class PantryController {
  static apiGetPantries = async ( req, res ) => {
    let result = [];
    let queries = {
      user_id: req.query.user_id,
      skip: req.query.skip,
      limit: req.query.limit
    };

    for( const subQuery in queries )
      if( payloadChecker.typeChecker( false, queries[ subQuery ], 'null' ) )
        delete queries[ subQuery ]

    try{
      result = await PantryDAO.getPantries( queries );
    } catch (error) {
      console.log('Unable to execute apiGetPantries: ', error);
    }

    if( req && res ){
      let response = {
        success: true,
        data: result
      }

      res.json( response );
    }

    return result;
  }

  static apiGetPantriesById = async ( req, res ) => {
    let pantry_id = req.params.id;

    let result = [];

    try{
      result = await PantryDAO.getPantriesById( pantry_id );
    } catch (error) {
      console.log('Unable to execute apiGetPantriesById: ', error);
    }

    if( req && res ){
      let response = {
        success: true,
        data: result
      }

      res.json( response );
    }

    return result;
  }

  static apiAddPantry = async ( req, res ) => {
    let result = new Object();
    
    const pantryDoc = req.body;
    
    try{
      result = await PantryDAO.addPantry( pantryDoc ).then( ({ _doc }) => {
        return {
          pantry_id: _doc._id,
          ..._doc
        }
      });
    } catch (error) {
      console.log('Unable to execute apiAddPantry: ', error);
    }

    if( req && res ){
      let response = {
        success: result? true: false,
        data: result
      }

      res.json( response );
    }

    return result;
  }

  static apiUpdatePantry = async ( req, res ) => {
    let result = new Object();

    const pantry_id = req.params.id;
    const pantryDoc = req.body;

    try{
      result = await PantryDAO.updatePantry( pantry_id, pantryDoc );
    } catch (error) {
      console.log('Unable to execute apiUpdatePantry: ', error);
    }

    if( req && res ){
      let response = {
        success: true,
        data: result
      }

      res.json( response );
    }

    return result;
  }

  static apiDeletePantry = async ( req, res ) => {
    let result = new Object();

    const pantry_id = req.params.id;

    try{
      result = await PantryDAO.deletePantry( pantry_id );
    } catch (error) {
      console.log('Unable to execute apiDeletePantry: ', error);
    }

    if( req && res ){
      let response = {
        success: true,
        data: result
      }

      res.json( response );
    }

    return result;
  }
}