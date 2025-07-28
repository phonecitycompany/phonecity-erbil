import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
import { getValueForDashboard } from '../../services/apiCapital';
export function useGetCapitalForDashboard() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterStartDate = searchParams.get('capitalStartDate');
  const filterEndDate = searchParams.get('capitalEndDate');

  // console.log(filterEndDate , filterStartDate);

  // QUERY
  const { isLoading, data: capitalItem } = useQuery({
    queryKey: ['capitalEarn1', filterStartDate, filterEndDate],
    queryFn: () => getValueForDashboard({ filterStartDate: filterStartDate }),
  });

  const { isLoading: loadingSecond, data: capitalItemSecond } = useQuery({
    queryKey: ['capitalEarn2', filterEndDate, filterEndDate],
    queryFn: () => getValueForDashboard({ filterEndDate: filterEndDate }),
  });
  // console.log(capitalItem);
  const newCombinedData = {
    capitalItem: capitalItem,
    capitalItemSecond: capitalItemSecond,
  };

  return { isLoading, loadingSecond, newCombinedData };
}
