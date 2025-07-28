// import { editInventoryItem as editInventoryItemromApi } from '../../services/apiInventory';
import { editCompanyTransactionItem } from '../../services/apiCompanyTransaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useEditTransaction() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editTransactionItem } = useMutation({
    mutationFn: editCompanyTransactionItem,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['companies_transaction'],
      });
      queryClient.invalidateQueries({
        queryKey: ['transactiontotal'],
      });

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
