import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLastTransactionItem } from '../../services/apiCompanyTransaction';
export function useGetLastCompanyItem() {
  // QUERY
  const { isLoading: lastItemLoading, data: lastItem } = useQuery({
    queryKey: ['lastItemId'],
    queryFn: () => getLastTransactionItem(),
  });

  // PRE-FETCHING

  return { lastItem, lastItemLoading };
}
