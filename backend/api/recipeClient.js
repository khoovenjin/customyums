import axios from 'axios';
import dotenv from "dotenv";

import { payloadChecker } from '../middleware/payloadChecker.js';

dotenv.config();

export default class RecipeClient {
  static #apiKey = `apiKey=${ process.env.RECIPE_API_KEY }`;
  static #limitData = 10;

  static getApiKey = () => this.#apiKey;

  static fetch = async ( url ) => {
    let result = new Object();

    try {
      result = await axios.get( url );
    } catch( error ) {
      console.log(`Unable to execute fetch on url: ${ url }`);
    }

    return result;
  }

  // Reference: https://spoonacular.com/food-api/docs#Get-Recipe-Information (For ingredients and nutritions)
  // Example: https://api.spoonacular.com/recipes/716429/information?includeNutrition=false
  static fetchRecipeById_Information = async ( id, showNutrition = false ) => {
    const URL = `${ process.env.RECIPE_BASE_URL }/${ id }/information?${ this.getApiKey() }&includeNutrition=${ showNutrition }`;
    let result = new Object();

    try {
      result = await this.fetch( URL ).then( res => res.data );
    } catch( error ) {
      console.log(`Unable to execute fetchRecipeById_Information`);
    }

    return result;
  }
  
  // Reference: https://spoonacular.com/food-api/docs#Autocomplete-Recipe-Search (For searching)
  // https://api.spoonacular.com/recipes/autocomplete?number=10&query=chick
  static fetchRecipeMatchByKey = async ( key ) => {
    const URL = `${ process.env.RECIPE_BASE_URL }/autocomplete?${ this.getApiKey() }&number=${ this.#limitData }&query=${ key }`;
    let result = new Array();

    try {
      result = await this.fetch( URL ).then( res => res.data );
    } catch( error ) {
      console.log(`Unable to execute fetchRecipeMatchByKey`);
    }

    return result;
  }

  // Reference: https://spoonacular.com/food-api/docs#Get-Analyzed-Recipe-Instructions (For steps)
  // https://api.spoonacular.com/recipes/324694/analyzedInstructions
  static fetchRecipeById_Instruction = async ( id ) => {
    const URL = `${ process.env.RECIPE_BASE_URL }/${ id }/analyzedInstructions?${ this.getApiKey() }`;
    let result = new Object();

    try {
      result = await this.fetch( URL ).then( res => res.data );
    } catch( error ) {
      console.log(`Unable to execute fetchRecipeById_Instruction`);
    }

    return result;
  }

  static fetchRecipeByIngredients = async ( ingredients = [], noOfResults = 5 ) => {
    if( payloadChecker.typeChecker( true, ingredients, 'array' ) || ingredients.length === 0 )
      return new Object();

    const separator = ',';
    const listOfIngredients = ingredients.join( separator );

    const URL = `${ process.env.RECIPE_BASE_URL }/findByIngredients?${ this.getApiKey() }&ingredients=${ listOfIngredients }&number=${ noOfResults }`;
    let result = new Object();

    try {
      result = await this.fetch( URL ).then( res => res.data );
    } catch( error ) {
      console.log(`Unable to execute fetchRecipeByIngredients`);
    }

    return result;
  }
}