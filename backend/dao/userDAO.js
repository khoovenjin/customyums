import mongoose from "mongoose";

import User from '../models/userModel.js';

export default class UserDAO {
  static #query_pipeline = [
    {
      $lookup: {
        from: "pantries",
        localField: "_id",
        foreignField: "user_id",
        as: "pantries"
      }
    },
    {
      $lookup: {
        from: "dietaries",
        localField: "_id",
        foreignField: "user_id",
        as: "dietaries"
      }
    },
    {
      $project: {
        _id: 0,
        user_id: "$_id",
        name: 1,
        username: 1,
        password: 1,
        createdAt: 1,
        pantries: {
          $map: {
            input: "$pantries",
            as: "pantry",
            in: {
              pantry_id: "$$pantry._id",
              user_id: "$$pantry.user_id",
              name: "$$pantry.name",
              amount: "$$pantry.amount"
            }
          }
        },
        dietaries: {
          $map: {
            input: "$dietaries",
            as: "dietary",
            in: {
              dietary_id: "$$dietary._id",
              user_id: "$$dietary.user_id",
              meal: "$$dietary.meal",
              recipes: "$$dietary.recipes",
              date: "$$dietary.date"
            }
          }
        }
      }
    }
  ];

  static getUsers = async () => {
    let result = new Array();

    const pipeline = this.#query_pipeline;

    try {
      result = await User.aggregate( pipeline );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static getUsersById = async ( id ) => {
    let result = new Array();
    
    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId( id )
        }
      },
      ...this.#query_pipeline
    ];

    try {
      result = await User.aggregate( pipeline );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static addUser = async ( userDoc ) => {
    let result;

    try {
      result = await User.create( userDoc );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static updateUser = async ( id, userDoc ) => {
    let result;

    const query = [
      {
        _id: new mongoose.Types.ObjectId( id )
      },
      {
        $set: {
          ...userDoc
        }
      }
    ]

    try {
      result = await User.updateOne( ...query );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static deleteUser = async ( id ) => {
    let result;
        
    try {
      // Delete all related entities: Pantry{ user_id } & Dietary{ user_id }
      

      result = await User.findByIdAndDelete( id );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }
}