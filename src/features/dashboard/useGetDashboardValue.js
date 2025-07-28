import { useQuery } from '@tanstack/react-query';
import { getValueForCapital } from '../../services/apiCapital';
export function useGetCapitalForDashboardNew() {
  const { isLoading: loadingForCapital, data: capitalItemData } = useQuery({
    queryKey: ['capitalDataAndDiff'],
    queryFn: () => getValueForCapital(),
  });
  return { loadingForCapital, capitalItemData };
}