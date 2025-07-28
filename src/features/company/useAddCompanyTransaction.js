import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AddCompanyTransaction } from '../../services/apiCompanyTransaction';

export function useAddCompanyTransaction() {
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addCompanyTransactionItem } =
    useMutation({
      mutationFn: AddCompanyTransaction,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['companies_transaction'],
        });
        queryClient.invalidateQueries({
          queryKey: ['transactiontotal'],
        });
        toast.success('بە سەرکەوتوی زیاد کرا', {
          style: {
            padding: '16px',
            color: '#713200',
            backgroundColor: '#fff',
            zIndex: 100,
          },
        });
      },
      onError: err =>
        toast.error(err.message, {
          style: {
            padding: '16px',
            backgroundColor: '#fff',
            zIndex: 100,
          },
        }),
    });

  return { isAdding, addCompanyTransactionItem };
}
