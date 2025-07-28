import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: err => {
      console.log('ERROR', err);
      toast.error('Failed to logout' ,  {
        style: {
          padding: '16px',
          backgroundColor: '#fff',
          zIndex : 100
        } 
        });
    },
  });

  return { logout, isLoading };
}
