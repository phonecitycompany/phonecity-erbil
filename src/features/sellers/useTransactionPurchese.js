import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTransactionPurcheses } from '../../services/apiTransactionPurchese';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useTransactionPurchese(transactionItamId) {
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

  // PAGINATION

  const page = !searchParams.get('children_page')
    ? 1
    : Number(searchParams.get('children_page'));

  // QUERY
  const {
    purcheseLoading,
    data: { data: transactionPurchese, count: purcheseCount } = {},
  } = useQuery({
    queryKey: ['transaction_purchese', page, transactionItamId],
    queryFn: () => getTransactionPurcheses({ page, transactionItamId }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(purcheseCount / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['transaction_purchese', page + 1, transactionItamId],
      queryFn: () =>
        getTransactionPurcheses({ page: page + 1, transactionItamId }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['transaction_purchese', page - 1, transactionItamId],
      queryFn: () =>
        getTransactionPurcheses({ page: page - 1, transactionItamId }),
    });

  return { purcheseLoading, purcheseCount, transactionPurchese };
}
