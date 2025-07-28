import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { addAndEditPhone } from '../../services/apiInventory';
export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addPhone } = useMutation({
    mutationFn: addAndEditPhone,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['inventory'],
      });

      toast.success('کاڵاکەت بە سەرکەوتوی زیاد کرا', {
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

  return { isAdding, addPhone };
}
