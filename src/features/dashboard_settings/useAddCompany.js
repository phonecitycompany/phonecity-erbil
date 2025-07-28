import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { addCompany as adcompanyApi } from '../../services/apiCompany';
export function useAddCompany() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addCompany } = useMutation({
    mutationFn: adcompanyApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usersData'],
      });

      toast.success('شەریکە بە سەرکەوتوی زیاد کرا', {
        style: {
          
          color: '#713200',
          backgroundColor: '#fff',
          zIndex : 100
        } 
        } );
    },
    onError: err => toast.error(err.message ,  {
      style: {
        padding: '16px',
        backgroundColor: '#fff',
        zIndex : 100
      } 
      }),
  });

  return { isAdding, addCompany };
}
