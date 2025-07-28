// import { editInventoryItem as editInventoryItemromApi } from '../../services/apiInventory';
import { updateSettings as editSettingFromApi } from '../../services/apiSettings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useEditSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editSetting } = useMutation({
    mutationFn: editSettingFromApi,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });

      toast.success('پارەکە بە سەرکەوتوی دەستکاری کرا', {
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

  return { isEditing, editSetting };
}
