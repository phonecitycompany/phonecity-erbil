import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteSellerItem } from '../../services/apiSeller';
import { deleteCompanyItem } from '../../services/apiCompany';
export function useDeleteCompany() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCompany } = useMutation({
        mutationFn: deleteCompanyItem,
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

    return { isDeleting, deleteCompany };
}
