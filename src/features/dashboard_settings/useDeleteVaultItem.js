import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteVault as deleteVaultFromApi} from '../../services/apiVault';
export function useDeleteVaultItem() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteTransactionItem } = useMutation({
        mutationFn: deleteVaultFromApi,
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
                queryKey: ['vaultItems'],
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

    return { isDeleting, deleteTransactionItem };
}
