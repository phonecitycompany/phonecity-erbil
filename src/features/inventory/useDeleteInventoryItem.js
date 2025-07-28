import { deleteInventoryItem as deleteInventoryItemApi } from '../../services/apiInventory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteInventoryItem } = useMutation({
    mutationFn: deleteInventoryItemApi,
    onSuccess: () => {
      toast.success('کاڵاکە بە سەرکەوتویی سڕایەوە', {
        style: {
          padding: '16px',
          color: '#713200',
          backgroundColor: '#fff',
          zIndex : 100
        } 
        });

      queryClient.invalidateQueries({
        queryKey: ['inventory'],
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

  return { isDeleting, deleteInventoryItem };
}
