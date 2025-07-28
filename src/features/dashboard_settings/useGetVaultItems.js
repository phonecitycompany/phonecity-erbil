import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
import { getVault, getallaults } from '../../services/apiVault';
export function UseGetVaultItems() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get('sortBy');
  const filterByDate = searchParams.get('date');
  const filterStartDate = searchParams.get('startDate');
  const filterEndDate = searchParams.get('endDate');
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
  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: transactionItems, count } = {} } = useQuery({
    queryKey: ['vaultItems', page, filterByDate, dateBetween, sortBy],
    queryFn: () => getVault({ page, filterByDate, dateBetween, sortBy }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['vaultItems', page + 1, filterByDate, dateBetween, sortBy],
      queryFn: () =>
        getVault({ page: page + 1, filterByDate, dateBetween, sortBy }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['vaultItems', page - 1, filterByDate, dateBetween, sortBy],
      queryFn: () =>
        getVault({ page: page - 1, filterByDate, dateBetween, sortBy }),
    });
  const { isallLoading, data: { data: allvaults } = {} } = useQuery({
    queryKey: ['totalvaultitems', filterByDate, dateBetween, sortBy],
    queryFn: () => getallaults(),
  });

  return { isLoading, count, transactionItems, allvaults };
}
