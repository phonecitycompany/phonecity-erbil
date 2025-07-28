import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
import { getCompanyItems } from '../../services/apiCompany';

export function useCompanyItem() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  
  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: companyItem, count } = {} } = useQuery({
    queryKey: ['companies', page],
    queryFn: () => getCompanyItems({ page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['companies', page + 1],
      queryFn: () => getCompanyItems({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['companies', page - 1],
      queryFn: () => getCompanyItems({ page: page - 1 }),
    });

  return { companyItem, isLoading, count };
}
