import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllLoans } from '../../services/apiCompanyOrSellerLoans';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useGetAllLoans() {
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

  const sortByRaw = searchParams.get('childrenTab');
  const filter = !sortByRaw
    ? { tableName: 'companies' }
    : sortByRaw.trim() == 'Local'
      ? { tableName: 'sellers', type: 'Local' }
      : sortByRaw.trim() == 'Oversea'
        ? { tableName: 'sellers', type: 'Oversea' }
        : sortByRaw.trim() == 'loans'
          ? { tableName: 'debtor' }
          : { tableName: 'companies' };

  //  { field: 'id', direction: false};
  // const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: loansItem, count } = {} } = useQuery({
    queryKey: ['getAllLoans', filter],
    queryFn: () => getAllLoans({ filter }),
  });

  return { isLoading, count, loansItem };
}
