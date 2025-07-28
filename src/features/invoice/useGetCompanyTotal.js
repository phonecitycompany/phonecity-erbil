import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSellerItems, getSingleSeller } from '../../services/apiSeller';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
import { getSingleComany } from '../../services/apiCompany';

export function useGetCompanyTotal() {
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
  const companyId = searchParams.get('company');

  //  { field: 'id', direction: false};
  // const sortBy = { field, direction };

  // QUERY
  const { isLoading, data: companyTotalData } = useQuery({
    queryKey: ['companyData', companyId],
    queryFn: () => getSingleComany(companyId),
  });

  return { isLoading, companyTotalData };
}
