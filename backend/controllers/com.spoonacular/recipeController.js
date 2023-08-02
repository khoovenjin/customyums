import RecipeClient from '../../api/recipeClient.js';

export default class RecipeController {
  static apiGetRecipeById_Information = async ( req, res ) => {
    const recipeId = req.params.id;
    const showNutrition = req.query.showNutrition === 'true';

    let result = new Object();

    try {
      result = await RecipeClient.fetchRecipeById_Information( recipeId, showNutrition );
    } catch( error ){
      console.log(`Unable to execute apiGetRecipeById_Information`);
    }

    let response = {
      success: true,
      data: result
    }

    res.json( response );
  }

  static apiGetRecipeMatchByKey = async ( req, res ) => {
    const key = req.query.key;

    let result = new Array();

    try {
      result = await RecipeClient.fetchRecipeMatchByKey( key );
    } catch( error ){
      console.log(`Unable to execute apiGetRecipeMatchByKey`);
    }

    let response = {
      success: true,
      data: result,
      count: result.length
    }

    res.json( response );
  }

  static apiGetRecipeById_Instruction = async ( req, res ) => {
    const recipeId = req.params.id;

    let result = new Object();

    try {
      result = await RecipeClient.fetchRecipeById_Instruction( recipeId );
    } catch( error ){
      console.log(`Unable to execute fetchRecipeById_Instruction`);
    }

    let response = {
      success: true,
      data: result
    }

    res.json( response );
  }
}