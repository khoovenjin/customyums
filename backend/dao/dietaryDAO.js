import mongoose from "mongoose";

import Dietary from '../models/dietaryModel.js';
import dbQuery from "../query/pipeline.js";

export default class DietaryDAO {
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
        dietary_id: "$_id",
        meal: 1,
        recipes: 1,
        date: 1,
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

  static #findOneAndUpdateProjection = {
    returnOriginal: false,
    projection: {
      dietary_id: "$_id",
      user_id: 1,
      meal: 1,
      date: 1,
      recipes: 1
    }
  };

  static getDietaries = async () => {
    let result = new Array();

    const pipeline = this.#query_pipeline;

    try {
      result = await Dietary.aggregate( pipeline );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static getDietariesById = async ( id ) => {
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
      result = await Dietary.aggregate( pipeline );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static addDietary = async ( dietaryDoc ) => {
    let result;

    try {
      result = await Dietary.create( dietaryDoc );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static updateDietary = async ( id, dietaryDoc ) => {
    let result;

    const query = [
      {
        _id: new mongoose.Types.ObjectId( id )
      },
      {
        $set: {
          ...dietaryDoc
        }
      }
    ]

    try {
      result = await Dietary.updateOne( ...query );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  static deleteDietary = async ( id ) => {
    let result;
        
    try {
      result = await Dietary.findByIdAndDelete( id );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  // Mutated delete query for special case
  static deleteDietaryByUserId = async ( user_id ) => {
    let result;

    const query = {
      user_id: new mongoose.Types.ObjectId( user_id )
    }

    try {
      result = await Dietary.deleteMany( query );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  // Mutated update query for special case: Flexible Type Array
  static addRecipe = async (
    addAttr,
    addValue,
    matchKeyPair = new Object(),
    attrFormatObj = new Object()
  ) => {
    let result;

    const query = dbQuery.initPipeline()
                          .matchKeyPair( matchKeyPair, attrFormatObj )
                          .push( addAttr, addValue.at( 0 ), false )
                          .get()

    try {
      result = await Dietary.findOneAndUpdate( ...query, this.#findOneAndUpdateProjection );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }

  // Mutated update query for special case: Flexible Type Array
  static removeRecipe = async (
    removeAttr,
    removeValue,
    matchBy,
    value
  ) => {
    let result;

    const query = dbQuery.initPipeline()
                          .match( matchBy, value, true )
                          .pull( removeAttr, removeValue, false )
                          .get()

    try {
      result = await Dietary.findOneAndUpdate( ...query, this.#findOneAndUpdateProjection );
    } catch (error) {
      console.log(`Unable to issue find command, ${error}`)
    }

    return result;
  }
}