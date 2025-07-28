import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCompanyTransactionItems,
  gettotalforfilter,
} from '../../services/apiCompanyTransaction';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useCompanyTransactionItems() {
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
  const companyid = searchParams.get('company');
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
      'companies_transaction',
      page,
      sortBy,
      companyid,
      filterByDate,
      dateBetween,
      bewlowDateValue,
    ],
    queryFn: () =>
      getCompanyTransactionItems({
        page,
        sortBy,
        companyid,
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
        'companies_transaction',
        page + 1,
        sortBy,
        companyid,
        filterByDate,
        dateBetween,
        bewlowDateValue,
      ],
      queryFn: () =>
        getCompanyTransactionItems({
          page: page + 1,
          sortBy,
          companyid,
          filterByDate,
          dateBetween,
          bewlowDateValue,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        'companies_transaction',
        page - 1,
        sortBy,
        companyid,
        filterByDate,
        dateBetween,
        bewlowDateValue,
      ],
      queryFn: () =>
        getCompanyTransactionItems({
          page: page - 1,
          sortBy,
          companyid,
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
      companyid,
      filterByDate,
      dateBetween,
      bewlowDateValue,
    ],
    queryFn: () =>
      gettotalforfilter({
        sortBy,
        companyid,
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
