import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { addVault as AddVaultFromApi } from '../../services/apiVault';
export function useAddVaultItem() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addVault } = useMutation({
    mutationFn: AddVaultFromApi,
    onSuccess: () => {
      queryClient.refetchQueries();

      toast.success('وەرگرەکە بە سەرکەوتوی زیاد کرا', {
        style: {
          padding: '16px',
          color: '#713200',
          backgroundColor: '#fff',
          zIndex: 100,
        },
      });
    },
    onError: err =>
      toast.error(err.message, {
        style: {
          padding: '16px',
          backgroundColor: '#fff',
          zIndex: 100,
        },
      }),
  });

  return { isAdding, addVault };
}