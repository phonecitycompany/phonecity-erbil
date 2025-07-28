// import { editInventoryItem as editInventoryItemromApi } from '../../services/apiInventory';
import { editCompanyItem as editCompanyItemFromApi } from '../../services/apiCompany';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useEditCompanyItem() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCompanyItem } = useMutation({
    mutationFn: editCompanyItemFromApi,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['usersData'],
      });

      toast.success('شەریکەکە بە سەرکەوتوی دەستکاری کرا', {
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

  return { isEditing, editCompanyItem };
}
