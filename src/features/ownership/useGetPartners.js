import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPartners } from '../../services/apiPartner';

export function useGetPartners() {
 

  // QUERY
  const { isLoading, data: { data: partnersData, count } = {} } = useQuery({
    queryKey: ['partners'],
    queryFn: () => getPartners(),
  });

 // PRE-FETCHING
  

  return { partnersData, isLoading, count };
}
