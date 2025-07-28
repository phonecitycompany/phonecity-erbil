import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLoans } from '../../services/apiCompanyOrSellerLoans';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useGetLoans() {
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
  const filterBy = searchParams.get('sortBy');
  const filterByDate = searchParams.get('date');
  const filterStartDate = searchParams.get('startDate');
  const filterEndDate = searchParams.get('endDate');

  const dateBetween = { startDate: filterStartDate, endDate: filterEndDate };
  const sortBy =
    filterBy?.trim() === 'totalLowToHigh'
      ? { field: 'total', direction: true }
      : filterBy?.trim() === 'totalHighToLow' && {
          field: 'total',
          direction: false,
        };

  const sortByRaw = searchParams.get('childrenTab');
  const filter = !sortByRaw
    ? {
        tableName: 'companies',
        select: '*',
        custmFunction:
          dateBetween.startDate && dateBetween.endDate ? true : false,
      }
    : sortByRaw.trim() == 'Local'
      ? {
          tableName: 'sellers',
          type: 'Local',
          select: '*',
          custmFunction:
            dateBetween.startDate && dateBetween.endDate ? true : false,
        }
      : sortByRaw.trim() == 'Oversea'
        ? {
            tableName: 'sellers',
            type: 'Oversea',
            select: '*',
            custmFunction:
              dateBetween.startDate && dateBetween.endDate ? true : false,
          }
        : sortByRaw.trim() == 'loans'
          ? {
              tableName: 'debtor',
              select: '*',
              custmFunction:
                dateBetween.startDate && dateBetween.endDate ? true : false,
            }
          : {
              tableName: 'companies',
              select: '*',
              custmFunction:
                dateBetween.startDate && dateBetween.endDate ? true : false,
            };

  //  { field: 'id', direction: false};
  // const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: loansItem, count } = {} } = useQuery({
    queryKey: [
      'sellerOrCompanyLoans',
      page,
      filter,
      sortBy,
      dateBetween,
      filterByDate,
    ],
    queryFn: () =>
      getLoans({ page, filter, sortBy, dateBetween, filterByDate }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        'sellerOrCompanyLoans',
        page + 1,
        filter,
        sortBy,
        dateBetween,
        filterByDate,
      ],
      queryFn: () =>
        getLoans({ page: page + 1, filter, sortBy, dateBetween, filterByDate }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        'sellerOrCompanyLoans',
        page - 1,
        filter,
        sortBy,
        dateBetween,
        filterByDate,
      ],
      queryFn: () =>
        getLoans({ page: page - 1, filter, sortBy, dateBetween, filterByDate }),
    });

  return { isLoading, count, loansItem };
}
