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
    queryKey: ['loanItems', loanstab],
    queryFn: () => getLoansItems({ loanstab }),
  });

  return { isLoading, count, loansItem };
}
