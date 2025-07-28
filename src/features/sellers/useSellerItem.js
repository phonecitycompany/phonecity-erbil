import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSellerItems } from '../../services/apiSeller';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useSellerItem() {
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
  const sortByRaw = searchParams.get('tab');

  const filter = !sortByRaw
    ? 'Local'
    : sortByRaw.trim() == 'Local'
      ? 'Local'
      : sortByRaw.trim() == 'Oversea'
        ? 'Oversea'
        : 'Local';
  //  { field: 'id', direction: false};
  // const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: sellerItem, count } = {} } = useQuery({
    queryKey: ['seller', page, filter],
    queryFn: () => getSellerItems({ page, filter }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['seller', page + 1, filter],
      queryFn: () => getSellerItems({ page: page + 1, filter }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['seller', page - 1, filter],
      queryFn: () => getSellerItems({ page: page - 1, filter }),
    });

  return { isLoading, count, sellerItem };
}
