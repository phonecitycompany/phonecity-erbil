import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLoansItems } from '../../services/apiLoans';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useLoanItems() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const loanstab = searchParams.get('tab');

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const { isLoading, data: { data: loansItem, count } = {} } = useQuery({
    queryKey: ['loanItems', page, loanstab],
    queryFn: () => getLoansItems({ page, loanstab }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['loanItems', page + 1, loanstab],
      queryFn: () => getLoansItems({ page: page + 1, loanstab }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['loanItems', page - 1, loanstab],
      queryFn: () => getLoansItems({ page: page - 1, loanstab }),
    });

  return { isLoading, count, loansItem };
}
