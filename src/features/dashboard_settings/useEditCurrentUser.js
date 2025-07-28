import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';
export function useEditCurrentUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser,  isLoading: isEditing } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['userforediting'],
        });
  
        toast.success('بە سەرکەوتوی دەستکاری کرا', {
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

  return { isEditing, updateUser };
}
