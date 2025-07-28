import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
import { getcapitalvalueByDate } from '../../services/apiCapital';
export function useGetEarnData() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterStartDate = searchParams.get('capitalStartDate');
  const filterEndDate = searchParams.get('capitalEndDate');

  // console.log(filterEndDate , filterStartDate);

  // QUERY
  const { isLoading, data: { data: capitalItem, count } = {} } = useQuery({
    queryKey: ['capitalEarn1', filterStartDate, filterEndDate],
    queryFn: () => getcapitalvalueByDate({ filterStartDate: filterStartDate }),
  });

  const {
    isLoading: loadingSecond,
    data: { data: capitalItemSecond, count: countSecond } = {},
  } = useQuery({
    queryKey: ['capitalEarn2', filterEndDate, filterEndDate],
    queryFn: () => getcapitalvalueByDate({ filterEndDate: filterEndDate }),
  });
  // console.log(capitalItem);
  const newCombinedData = {
    capitalItem: capitalItem,
    capitalItemSecond: capitalItemSecond,
  };

  return { isLoading, loadingSecond, count, countSecond, newCombinedData };
}
