import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { DeletePartner as deletePartnerFromApi } from '../../services/apiPartner';
export function useDeletePartner() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deletePartner } = useMutation({
        mutationFn: deletePartnerFromApi,
        onSuccess: () => {
            toast.success('کاڵاکە بە سەرکەوتویی سڕایەوە', {
                style: {
                  padding: '16px',
                  color: '#713200',
                  backgroundColor: '#fff',
                  zIndex : 100
                } 
                });

            queryClient.invalidateQueries({
                queryKey: ['usersData'],
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

    return { isDeleting, deletePartner };
}
