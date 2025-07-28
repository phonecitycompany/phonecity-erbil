import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AddLoansItem } from '../../services/apiLoans';
export function useAddLoans() {
  const queryClient = useQueryClient();
  
    
  const { isLoading: isAdding, mutate: addLoan } = useMutation({
    mutationFn: AddLoansItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usersData'],
      });

      toast.success('وەرگرەکە بە سەرکەوتوی زیاد کرا', {
        style: {
          padding: '16px',
          color: '#713200',
          backgroundColor: '#fff',
          zIndex : 100
        } 
        });
    },
    onError: err => toast.error(err.message  ,  {
      style: {
        padding: '16px',
        backgroundColor: '#fff',
        zIndex : 100
      } 
      }),
  });

  return { isAdding, addLoan };
}
