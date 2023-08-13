import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import dietaryApi from '../api/dietaryApi';
import Utils from '../../utilities/utils';

export default useUpcomingDietary = () => {
  const currentDate = Utils.dateToString( Date.now() );
  const query = useMemo(() => ({ query: { isCompleted: false, gte: currentDate, nearest: true } }), []);

  const {
    loading: dietariesLoading,
    error: dietariesError,
    data: upcomingDietaries
  } = useQuery( dietaryApi.GET_DIETARIES, {
    variables: query
  })

  return [ dietariesLoading, dietariesError, upcomingDietaries ];
}