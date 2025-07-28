import { editInventoryItem as editInventoryItemromApi } from '../../services/apiInventory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useEditInventoryItems() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editInventoryItem } = useMutation({
    mutationFn: editInventoryItemromApi,
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

  return { isEditing, editInventoryItem };
}
