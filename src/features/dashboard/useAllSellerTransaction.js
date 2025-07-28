import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllTransactionItems} from '../../services/apiTransaction';
export function useAllSellerTransaction() {
 

  // QUERY
  const { isLoading, data: { data: allsellerTransacrtion, count } = {} } = useQuery({
    queryKey: ['allseller_transaction'],
    queryFn: () => getAllTransactionItems(),
  });

 // PRE-FETCHING
  

  return { allsellerTransacrtion, isLoading, count };
}