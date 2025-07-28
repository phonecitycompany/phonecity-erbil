// import { editInventoryItem as editInventoryItemromApi } from '../../services/apiInventory';
import { editLoansItem } from '../../services/apiLoans';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useEditLoanItem() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editLoan } = useMutation({
    mutationFn: editLoansItem,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['loanItems'],
      });

      toast.success('وەرگرەکە بە سەرکەوتوی دەستکاری کرا', {
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

  return { isEditing, editLoan };
}
