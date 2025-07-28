import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllPartnersTransaction } from '../../services/apiPartnertransaction';
export function useAllpartner() {
 

  // QUERY
  const { isLoading, data: { data: allpartner, count } = {} } = useQuery({
    queryKey: ['allpartner_transaction'],
    queryFn: () => getAllPartnersTransaction(),
  });

 // PRE-FETCHING
  

  return { allpartner, isLoading, count };
}