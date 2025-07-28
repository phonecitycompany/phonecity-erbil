import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AddSeller } from '../../services/apiSeller';
export function useCreateCabin() {
  const queryClient = useQueryClient();
  
    
  const { isLoading: isAdding, mutate: addSeller } = useMutation({
    mutationFn: AddSeller,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['seller'],
      });

      toast.success('کڕیارەکە بە سەرکەوتوی زیاد کرا', {
        style: {
          padding: '16px',
          color: '#713200',
          backgroundColor: '#fff',
          zIndex : 100
        } 
        });
    },
    onError: err => toast.error(err.message  , {
      style: {
        padding: '16px',
        backgroundColor: '#fff',
        zIndex : 100
      } 
      }),
  });

  return { isAdding, addSeller };
}
