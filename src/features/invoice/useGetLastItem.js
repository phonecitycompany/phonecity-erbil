import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLastTransactionItem } from '../../services/apiTransaction';
export function useGetLastItem() {
  // QUERY
  const { isLoading: lastItemLoading, data: lastItem } = useQuery({
    queryKey: ['lastItemId'],
    queryFn: () => getLastTransactionItem(),
  });

  // PRE-FETCHING

  return { lastItem, lastItemLoading };
}
