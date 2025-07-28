import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getTransactionItems,
  gettotalforfilter,
} from '../../services/apiTransaction';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useTransactionItems() {
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
  function splitStringByComma(inputString) {
    const resultArray = inputString.split(',');

    // Trim whitespace from each substring
    const trimmedResultArray = resultArray.map(substring => substring.trim());

    return trimmedResultArray;
  }
  const sortByRaw = searchParams.get('sortBy');
  const sellerId = searchParams.get('seller');
  const filterByDate = searchParams.get('date');
  const filterStartDate = searchParams.get('startDate');
  const filterEndDate = searchParams.get('endDate');
  const bewlowDateValue = searchParams.get('belowDateValue');

  const dateBetween = { startDate: filterStartDate, endDate: filterEndDate };
  const sortBy =
    sortByRaw?.trim() === 'outHighToLow'
      ? { field: 'outgoing_purchase', direction: true }
      : sortByRaw?.trim() === 'outLowToHigh'
        ? { field: 'outgoing_purchase', direction: false }
        : sortByRaw?.trim() === 'ingoingHighToLow'
          ? { field: 'ingoing_purchase', direction: true }
          : sortByRaw?.trim() === 'ingoingLowToHigh'
            ? { field: 'ingoing_purchase', direction: false }
            : { field: 'id', direction: false };
  // const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: transactionItems, count } = {} } = useQuery({
    queryKey: [
      'transaction',
      page,
      sortBy,
      sellerId,
      filterByDate,
      dateBetween,
      bewlowDateValue,
    ],
    queryFn: () =>
      getTransactionItems({
        page,
        sortBy,
        sellerId,
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
        'transaction',
        page + 1,
        sortBy,
        sellerId,
        filterByDate,
        dateBetween,
        bewlowDateValue,
      ],
      queryFn: () =>
        getTransactionItems({
          page: page + 1,
          sortBy,
          sellerId,
          filterByDate,
          dateBetween,
          bewlowDateValue,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        'transaction',
        page - 1,
        sortBy,
        sellerId,
        filterByDate,
        dateBetween,
        bewlowDateValue,
      ],
      queryFn: () =>
        getTransactionItems({
          page: page - 1,
          sortBy,
          sellerId,
          filterByDate,
          dateBetween,
          bewlowDateValue,
        }),
    });
  const {
    isLoading: totalforfilterloading,
    data: { data: totalforfilter } = {},
  } = useQuery({
    queryKey: [
      'transactiontotal',
      sortBy,
      sellerId,
      filterByDate,
      dateBetween,
      bewlowDateValue,
    ],
    queryFn: () =>
      gettotalforfilter({
        sortBy,
        sellerId,
        filterByDate,
        dateBetween,
        bewlowDateValue,
      }),
  });
  return {
    isLoading,
    count,
    transactionItems,
    totalforfilter,
    totalforfilterloading,
  };
}
