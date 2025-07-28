import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createNewUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
export function useAddAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addnewUser,  isLoading: isAdding } = useMutation({
    mutationFn: createNewUser,
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['userForAdding'],
        });
        navigate('/login', { replace: true });
        toast.success('بە سەرکەوتوی دەستکاری کرا', {
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

  return { isAdding, addnewUser };
}
