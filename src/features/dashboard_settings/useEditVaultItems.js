import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editVault as editVaultFromApi } from '../../services/apiVault';
export function useEditVaultItems() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editTransactionItem } = useMutation({
    mutationFn: editVaultFromApi,
    onSuccess: data => {
      queryClient.refetchQueries();

      toast.success('بە سەرکەوتوی دەستکاری کرا', {
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

  return { isEditing, editTransactionItem };
}