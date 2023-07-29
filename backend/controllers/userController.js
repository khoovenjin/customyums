import DietaryDAO from '../dao/dietaryDAO.js';
import PantryDAO from '../dao/pantryDAO.js';
import UserDAO from '../dao/userDAO.js';

import { payloadChecker } from '../middleware/payloadChecker.js';
import utilsController from "./utils.js";

export default class UserController {
  static apiGetUsers = async ( req, res ) => {
    let result = [];

    try{
      result = await UserDAO.getUsers();
    } catch (error) {
      console.log('Unable to execute apiGetUsers: ', error);
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

  static apiGetUsersById = async ( req, res ) => {
    let user_id = req.params.id;

    let result = [];

    try{
        result = await UserDAO.getUsersById( user_id );
    } catch (error) {
        console.log('Unable to execute apiGetUsersById: ', error);
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

  static apiAddUser = async ( req, res ) => {
    let result = new Object();
    
    const userDoc = req.body;

    utilsController.setDate( userDoc );
    
    try{
      result = await UserDAO.addUser( userDoc ).then( ({ _doc }) => {
        return {
          user_id: _doc._id,
          ..._doc
        }
      });
    } catch (error) {
      console.log('Unable to execute apiAddUser: ', error);
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

  static apiUpdateUser = async ( req, res ) => {
    let result = new Object();

    const user_id = req.params.id;
    const userDoc = req.body;

    try{
      result = await UserDAO.updateUser( user_id, userDoc );
    } catch (error) {
      console.log('Unable to execute apiUpdateUser: ', error);
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

  static apiDeleteUser = async ( req, res ) => {
    let result = new Object();

    const user_id = req.params.id;

    try{
      result = await UserDAO.deleteUser( user_id ).then( async res => {
        if( payloadChecker.typeChecker( true, res, 'null' ) ) {
          
          // Delete Pantry
          await PantryDAO.deletePantryByUserId( user_id );
          
          // Delete Dietary
          await DietaryDAO.deleteDietaryByUserId( user_id );

        }

        return res;
      });
    } catch (error) {
      console.log('Unable to execute apiDeleteUser: ', error);
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