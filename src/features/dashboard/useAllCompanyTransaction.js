import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllCompanyTransactionItems} from '../../services/apiCompanyTransaction';
export function useAllCompanyTransaction() {
 

  // QUERY
  const { isLoading, data: { data: allCompany, count } = {} } = useQuery({
    queryKey: ['allcompanies_transaction'],
    queryFn: () => getAllCompanyTransactionItems(),
  });

 // PRE-FETCHING
  

  return { allCompany, isLoading, count };
}