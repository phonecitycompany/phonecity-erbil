import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AddPartners as addpartnerfromapi } from '../../services/apiPartner';
export function useAddPartner() {
  const queryClient = useQueryClient();
  
    
  const { isLoading: isAdding, mutate: addPartnerFunction } = useMutation({
    mutationFn: addpartnerfromapi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['usersData'],
      });

      toast.success('وەرگرەکە بە سەرکەوتوی زیاد کرا', {
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

  return { isAdding, addPartnerFunction };
}
