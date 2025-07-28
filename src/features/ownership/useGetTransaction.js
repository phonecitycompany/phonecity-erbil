import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
import { getPartnersTransaction } from '../../services/apiPartnertransaction';
export function useGetPartnersTransaction() {
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
  const partnerId = searchParams.get('partner');
  const filterByDate = searchParams.get('date');
  const filterStartDate = searchParams.get('startDate');
  const filterEndDate = searchParams.get('endDate');
  const bewlowDateValue = searchParams.get('belowDateValue');
  const dateBetween = { startDate: filterStartDate, endDate: filterEndDate };
  const sortBy =
    sortByRaw?.trim() === 'outHighToLow'
      ? { field: 'withdrawal', direction: false }
      : sortByRaw?.trim() === 'outLowToHigh'
        ? { field: 'withdrawal', direction: true }
        : sortByRaw?.trim() === 'ingoingHighToLow'
          ? { field: 'deposit', direction: false }
          : sortByRaw?.trim() === 'ingoingLowToHigh'
            ? { field: 'deposit', direction: true }
            : { field: 'id', direction: false };
  // const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: transactionItems, count } = {} } = useQuery({
    queryKey: [
      'partner_transaction',
      page,
      sortBy,
      partnerId,
      filterByDate,
      dateBetween,
      bewlowDateValue,
    ],
    queryFn: () =>
      getPartnersTransaction({
        page,
        sortBy,
        partnerId,
        filterByDate,
        dateBetween,
        bewlowDateValue,
      }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        'partner_transaction',
        page + 1,
        sortBy,
        partnerId,
        filterByDate,
        dateBetween,
        bewlowDateValue,
      ],
      queryFn: () =>
        getPartnersTransaction({
          page: page + 1,
          sortBy,
          partnerId,
          filterByDate,
          dateBetween,
          bewlowDateValue,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        'partner_transaction',
        page - 1,
        sortBy,
        partnerId,
        filterByDate,
        dateBetween,
        bewlowDateValue,
      ],
      queryFn: () =>
        getPartnersTransaction({
          page: page - 1,
          sortBy,
          partnerId,
          filterByDate,
          dateBetween,
          bewlowDateValue,
        }),
    });

  return { isLoading, count, transactionItems };
}
