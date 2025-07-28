import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSellerItems, getSingleSeller } from '../../services/apiSeller';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useGetPersonTotal() {
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
  const sellerId = searchParams.get('seller');

  //  { field: 'id', direction: false};
  // const sortBy = { field, direction };

  // QUERY
  const { isLoading, data: sellerData } = useQuery({
    queryKey: ['sellerData', sellerId],
    queryFn: () => getSingleSeller(sellerId),
  });

  return { isLoading, sellerData };
}
