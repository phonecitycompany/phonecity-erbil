// import { deleteInventoryItem as deleteInventoryItemApi } from '../../services/apiInventory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {deletePartnersTransaction as deletePartnersTransactionApi} from '../../services/apiPartnertransaction'
export function useDeleteTransaction() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteTransactionItem } = useMutation({
        mutationFn: deletePartnersTransactionApi,
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
                queryKey: ['partner_transaction'],
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
