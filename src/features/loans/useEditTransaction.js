import { editTransactionItem as editTransactionItemFromApi } from '../../services/apiLoansTransaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useEditTransaction() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editTransactionItem } = useMutation({
    mutationFn: editTransactionItemFromApi,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['loan_transaction'],
      });

      toast.success('بە سەرکەوتوی دەستکاری کرا', {
        style: {
          padding: '16px',
          color: '#713200',
          backgroundColor: '#fff',
          zIndex : 100
        } 
        });
    },
    onError: err => toast.error(err.message ,  {
      style: {
        padding: '16px',
        backgroundColor: '#fff',
        zIndex : 100
      } 
      }),
  });

  return { isEditing, editTransactionItem };
}
