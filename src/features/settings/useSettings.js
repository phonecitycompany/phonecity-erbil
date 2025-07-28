import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

function useSettings() {
  const {
    error,
    isLoading,
    data: settings,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: () => {
      return getSettings();
    },
  });

  return { error, isLoading, settings };
}

export default useSettings;
