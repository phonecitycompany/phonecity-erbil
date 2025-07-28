import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getcapital } from '../../services/apiCapital';
export function useGetCapital() {
 

  // QUERY
  const { isLoading, data: { data: capitalData, count } = {} } = useQuery({
    queryKey: ['capital'],
    queryFn: () => getcapital(),
  });

 // PRE-FETCHING
  

  return { capitalData, isLoading, count };
}
