import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';

import pantryApi from '../api/pantryApi';
import spoonacularApi from '../api/com.spoonacular/client';

export default usePantryRecipe = ( user_id ) => {
  const [ pantryRecipes, setPantryRecipes ] = useState([]);
  const getQuery = useMemo(() => ({ query: { user_id } }), [ user_id ]);

  const {
    loading: pantriesLoading,
    error: pantriesError,
    data: pantries
  } = useQuery( pantryApi.GET_PANTRIES, {
    variables: getQuery
  });

  const fetchPantryRecipes = async () => {
    const filterName = pantries.pantries.map( item => item.name );

    const { data } = await spoonacularApi.GET_RECIPE_MATCH_BY_INGREDIENTS( filterName );

    setPantryRecipes( data );
  }

  const memoizedPantryRecipes = useCallback(() => {
    if( pantries ) {
      fetchPantryRecipes();
    }
  }, [ pantries ]);

  useEffect(() => {
    if ( !pantriesLoading && !pantriesError && pantries ) {
      memoizedPantryRecipes();
    }
  }, [ pantriesLoading, pantriesError, pantries ]);

  return pantryRecipes;
}