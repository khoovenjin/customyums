import mongoose from "mongoose";

import Pantry from '../models/pantryModel.js';

export default class PantryDAO {
  static #query_pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user"
      }
    },
    {
        $unwind: "$user"
    },
    {
      $project: {
        pantry_id: "$_id",
        name: 1,
        amount: 1,
        user: {
          user_id: "$user._id",
          name: "$user.name",
          username: "$user.username",
          password: "$user.password",
          createdAt: "$user.createdAt"
        }
      }
    }
  ];

  static getPantries = async () => {
    let result = new Array();

    const pipeline = this.#query_pipeline;

    try {
      result = await Pantry.aggregate( pipeline );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static getPantriesById = async ( id ) => {
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
      result = await Pantry.aggregate( pipeline );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static addPantry = async ( pantryDoc ) => {
    let result;

    try {
      result = await Pantry.create( pantryDoc );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static updatePantry = async ( id, pantryDoc ) => {
    let result;

    const query = [
      {
        _id: new mongoose.Types.ObjectId( id )
      },
      {
        $set: {
          ...pantryDoc
        }
      }
    ]

    try {
      result = await Pantry.updateOne( ...query );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static deletePantry = async ( id ) => {
    let result;
        
    try {
      result = await Pantry.findByIdAndDelete( id );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  // Mutated delete query for special case
  static deletePantryByUserId = async ( user_id ) => {
    let result;

    const query = {
      user_id: new mongoose.Types.ObjectId( user_id )
    }

    try {
      result = await Pantry.deleteMany( query );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }
}