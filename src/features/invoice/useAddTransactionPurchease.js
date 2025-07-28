import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AddTransactionPurchease } from '../../services/apiTransactionPurchese';
export function useAddTransactionPurchease() {
  const queryClient = useQueryClient();
  const { isLoading: isAddingpurchese, mutate: addingPurchease } = useMutation({
    mutationFn: AddTransactionPurchease,
    onSuccess: () => {
      
      queryClient.invalidateQueries({
        queryKey: ['seller_transaction'],
      });
      

      toast.success('بە سەرکەوتوی زیاد کرا', {
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

  return { isAddingpurchese, addingPurchease  };
}
