import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getInventoryItems } from '../../services/apiInventory';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useInventoryItems() {
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

  const sortBy =
    sortByRaw?.trim() === 'highToLow'
      ? { field: 'item_price', direction: false }
      : sortByRaw?.trim() === 'lowToHigh'
        ? { field: 'item_price', direction: true }
        : sortByRaw?.trim() === 'mostSold'
          ? { field: 'total_sell', direction: false }
          : sortByRaw?.trim() === 'leastSold'
            ? { field: 'total_sell', direction: true }
            : sortByRaw?.trim() === 'prodHighToLow'
              ? { field: 'item_quantity', direction: false }
              : sortByRaw?.trim() === 'prodLowToHigh'
                ? { field: 'item_quantity', direction: true }
                : { field: 'item_quantity', direction: false };
  // const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: inventoryItems, count } = {} } = useQuery({
    queryKey: ['inventory', page, sortBy],
    queryFn: () => getInventoryItems({ page, sortBy }),
  });

  return { isLoading, count, inventoryItems };
}
