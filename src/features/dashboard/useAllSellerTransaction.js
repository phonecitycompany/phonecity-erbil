import { useQuery } from '@tanstack/react-query';
import { getAllLoans } from '../../services/apiCompanyOrSellerLoans';

export function useAllSellerTransaction() {
  const filter = { tableName: 'sellers', type: 'Local' };

  // QUERY
  const { isLoading, data: { data: loansItem, count } = {} } = useQuery({
    queryKey: ['getAllLoans', filter],
    queryFn: () => getAllLoans({ filter }),
  });

  const totalLocalLoan = loansItem?.[0]?.total_value || 0;

  return { totalLocalLoan, allsellerTransacrtion: loansItem, isLoading, count };
}