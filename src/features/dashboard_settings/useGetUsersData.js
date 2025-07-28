import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
import { getUsers as getUsersFromApi } from '../../services/apiUsers';
export function useGetUsersData() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
 

  const sortByRaw = searchParams.get('childrenTab');
  const filter = !sortByRaw
    ? { tableName : "companies"  }
    : sortByRaw.trim() == 'Local'
    ? { tableName : "sellers" , type : "Local" }
    : sortByRaw.trim() == 'Oversea'
    ? { tableName : "sellers" , type : "Oversea" } : sortByRaw.trim() == 'loans' ? { tableName : "debtor" } : sortByRaw.trim() == 'partners' ? { tableName : "partners" } : { tableName : "companies"  };
    

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: users, count } = {} } = useQuery({
    queryKey: ['usersData', page, filter ],
    queryFn: () => getUsersFromApi({ page, filter ,  }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['usersData', page + 1 ],
      queryFn: () => getUsersFromApi({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['usersData', page - 1],
      queryFn: () => getUsersFromApi({ page: page - 1 }),
    });

  return { isLoading, count, users };
}
