import { useDeferredValue, useEffect, useMemo, useState } from 'react';

import spoonacularApi from '../api/com.spoonacular/client';

import Utils from '../utilities/utils';

export default useSearchRecipe = () => {
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ searchRecipes, setSearchRecipes ] = useState([]);
  const deferredRecipes = useDeferredValue( searchRecipes );
  const timeout = 1000; // 1 sec
  const minLength = 3;

  const delayDebounce = useMemo(() => {
    if( searchQuery.length >= minLength ) {
      return setTimeout( async () => {
        const { data } = await spoonacularApi.GET_RECIPE_MATCH_BY_KEY( searchQuery );
  
        setSearchRecipes( data );
      }, timeout );
    }
    
    setSearchRecipes([]);
    return null;
  }, [ searchQuery ]);

  useEffect(() => {
    let timeoutId;

    timeoutId = delayDebounce;

    if( Utils.typeChecker( true, timeoutId, 'null' ) )
      return () => clearTimeout( timeoutId );
  }, [ searchQuery ]);

  return [ deferredRecipes, setSearchQuery ];
}