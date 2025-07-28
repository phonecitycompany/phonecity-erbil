import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AddLoanTransaction } from '../../services/apiLoansTransaction';
export function useAddtransactionLoan() {
  const queryClient = useQueryClient();
  
    
  const { isLoading: isAdding, mutate: addTransaction } = useMutation({
    mutationFn: AddLoanTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['loan_transaction'],
      });

      toast.success('قەرزەکە بە سەرکەوتوی زیاد کرا', {
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

  return { isAdding, addTransaction };
}
