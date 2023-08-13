import { useCallback, useEffect, useState } from 'react';

import spoonacularApi from '../api/com.spoonacular/client';

export default useFeaturedRecipe = ( noOfResults ) => {
  const [ featuredRecipes, setFeaturedRecipes ] = useState([]);

  const fetchFeaturedRecipes = async ( number = 10 ) => {
    const { data } = await spoonacularApi.GET_RANDOM_RECIPE( number );

    setFeaturedRecipes( data );
  }

  const memoizedFeaturedRecipes = useCallback(() => {
    fetchFeaturedRecipes( noOfResults );
  }, [ noOfResults ]);

  useEffect(() => {
    memoizedFeaturedRecipes();
  }, [ noOfResults ]);

  return featuredRecipes;
}