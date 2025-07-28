import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { UpdateArrayOfItms } from '../../services/apiInventory';
export function useUpdateInventoryItems() {
  const queryClient = useQueryClient();

  const { isLoading: isEditingArray, mutate: editArrayInventoryItem } = useMutation({
    mutationFn: UpdateArrayOfItms,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['inventory'],
      });

      toast.success('کاڵاکەت بە سەرکەوتوی دەستکاری کرا', {
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

  return { isEditingArray, editArrayInventoryItem };
}
