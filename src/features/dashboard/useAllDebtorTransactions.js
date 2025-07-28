import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllLoanTransactionItems } from '../../services/apiLoansTransaction';
export function useGetAllDebtorTransaction() {
  // QUERY
  const { isLoading, data: { data: allLoans, count } = {} } = useQuery({
    queryKey: ['allLoan_transaction'],
    queryFn: () => getAllLoanTransactionItems(),
  });

  // PRE-FETCHING

  return { allLoans, isLoading, count };
}
