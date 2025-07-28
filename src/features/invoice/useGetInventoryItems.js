import { getAllInventoryItems } from '../../services/apiInventory';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useGetInventoryItems() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  // // FILTER
  // const filterValue = searchParams.get('status');
  // const filter =
  //   !filterValue || filterValue === 'all'
  //     ? null
  //     : { field: 'status', value: filterValue };
  // // { field: "totalPrice", value: 5000, method: "gte" };

  // // SORT
  const sortByRaw = searchParams.get('sortBy');

  const sortBy = { field: 'item_quantity', direction: false };
  // const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: inventoryItems, count } = {} } = useQuery({
    queryKey: ['inventoryItems', sortBy],
    queryFn: () => getAllInventoryItems({ sortBy }),
  });

  return { isLoading, count, inventoryItems };
}
