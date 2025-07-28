import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { EditPartner as editPartnerFromApi } from '../../services/apiPartner';
export function useEditPartner() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editPartner } = useMutation({
    mutationFn: editPartnerFromApi,
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

  return { isEditing, editPartner };
}
