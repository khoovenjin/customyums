import PantryDAO from '../dao/pantryDAO.js';

export default class PantryController {
  static apiGetPantries = async ( req, res ) => {
    let result = [
      {
        $project: {
          _id: 0,
          pantry_id: "$_id",
          name: 1,
          amount: 1
        }
      }
    ];

    try{
      result = await PantryDAO.getPantries();
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