import DietaryDAO from '../dao/dietaryDAO.js';

import { payloadChecker } from '../middleware/payloadChecker.js';
import utilsController from './utils.js';

export default class DietaryController {
  static apiGetDietaries = async ( req, res ) => {
    let result = [];
    let queries = {
      user_id: req.query.user_id,
      gt: req.query.gt,
      gte: req.query.gte,
      lt: req.query.lt,
      lte: req.query.lte,
      isCompleted: req.query.isCompleted,
      nearest: req.query.nearest,
      skip: req.query.skip,
      limit: req.query.limit
    };

    for( const subQuery in queries )
      if( payloadChecker.typeChecker( false, queries[ subQuery ], 'null' ) )
        delete queries[ subQuery ]

    try{
      result = await DietaryDAO.getDietaries( queries );
    } catch (error) {
      console.log('Unable to execute apiGetDietaries: ', error);
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

  static apiGetDietariesById = async ( req, res ) => {
    let dietary_id = req.params.id;
    let result = [];

    try{
      result = await DietaryDAO.getDietariesById( dietary_id );
    } catch (error) {
      console.log('Unable to execute apiGetDietariesById: ', error);
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

  static apiAddDietary = async ( req, res ) => {
    let result = new Object();
    
    const dietaryDoc = req.body;

    utilsController.setCompleted( dietaryDoc );

    const matchKeyPair = {
      "user_id": dietaryDoc?.user_id,
      "meal": dietaryDoc?.meal,
      "date": dietaryDoc?.date
    }
    
    const attrFormatObj = {
      'user_id': 'id',
      'date': 'date'
    };

    try{
      result = await DietaryDAO.addRecipe(
        'recipes',
        dietaryDoc?.recipes,
        matchKeyPair,
        attrFormatObj
      ).then( async res => {
        let response = res;

        if( payloadChecker.typeChecker( false, res, 'null' ) )
          response = await DietaryDAO.addDietary( dietaryDoc ).then( ({ _doc }) => {
            return {
              dietary_id: _doc._id,
              ..._doc
            }
          });

        return response;
      });

    } catch (error) {
      console.log('Unable to execute apiAddDietary: ', error);
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

  static apiUpdateDietary = async ( req, res ) => {
    let result = new Object();

    const dietary_id = req.params.id;
    const dietaryDoc = req.body;

    try{
      result = await DietaryDAO.updateDietary( dietary_id, dietaryDoc );
    } catch (error) {
      console.log('Unable to execute apiUpdateDietary: ', error);
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

  // Special Case for DeleteDietary: FindAndUpdate -> (Optional) Delete  
  static apiDeleteDietary = async ( req, res ) => {
    let result = new Object();

    const dietary_id = req.params.id;
    const dietaryDoc = req.body;

    try{
      result = await DietaryDAO.removeRecipe(
        'recipes',
        dietaryDoc?.recipes,
        '_id',
        dietary_id
      ).then( async res => {
        let response;

        if( !res?.recipes?.length )
          response = await DietaryDAO.deleteDietary( dietary_id );

        return response;
      });
    } catch (error) {
      console.log('Unable to execute apiDeleteDietary: ', error);
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