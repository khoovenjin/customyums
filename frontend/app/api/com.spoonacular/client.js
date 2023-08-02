import { RECIPE_BASE_URL } from "@env";

import axios from 'axios';

const fetch = async ( url ) => {
  let result = new Object();

  try {
    result = await axios.get( url );
  } catch( error ) {
    console.log(`Unable to execute fetch on url: ${ url }`);
  }

  return result;
}

const GET_RECIPE_INFORMATION = async ( id, showNutrition = false ) => {
  const URL = `${ RECIPE_BASE_URL }/${ id }/information?showNutrition=${ showNutrition }`;
  let result = new Object();

  try {
    result = await fetch( URL ).then( res => res.data );
  } catch( error ) {
    console.log(`Unable to execute GET_RECIPE_INFORMATION`);
  }

  return result;
}

const GET_RECIPE_MATCH_BY_KEY = async ( key ) => {
  const URL = `${ RECIPE_BASE_URL }/autocomplete?key=${ key }`;
  let result = new Array();

  try {
    result = await fetch( URL ).then( res => res.data );
  } catch( error ) {
    console.log(`Unable to execute GET_RECIPE_MATCH_BY_KEY`);
  }

  return result;
}

const GET_RECIPE_INSTRUCTION = async ( id ) => {
  const URL = `${ RECIPE_BASE_URL }/${ id }/instruction`;
  let result = new Object();

  try {
    result = await fetch( URL ).then( res => res.data );
  } catch( error ) {
    console.log(`Unable to execute GET_RECIPE_INSTRUCTION`);
  }

  return result;
}

export default{
  GET_RECIPE_INFORMATION,
  GET_RECIPE_MATCH_BY_KEY,
  GET_RECIPE_INSTRUCTION
}