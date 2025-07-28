// import { editInventoryItem as editInventoryItemromApi } from '../../services/apiInventory';
import { editSellerItem as editSellerItemFromApi } from '../../services/apiSeller';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useEditSellerItem() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editSellerItem } = useMutation({
    mutationFn: editSellerItemFromApi,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['usersData'],
      });

      toast.success('کڕیارەکە بە سەرکەوتوی دەستکاری کرا', {
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

  return { isEditing, editSellerItem };
}
