import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AddPartnersTransaction } from '../../services/apiPartnertransaction';
export function useAddTransaction() {
  const queryClient = useQueryClient();
  
    
  const { isLoading: isAdding, mutate: addTransaction } = useMutation({
    mutationFn: AddPartnersTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['partner_transaction'],
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
    onError: err => toast.error(err.message , {
      style: {
        padding: '16px',
        backgroundColor: '#fff',
        zIndex : 100
      } 
      }),
  });

  return { isAdding, addTransaction };
}
