import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotification } from '../../services/apiNotification';
import { useSearchParams } from 'react-router-dom';
import SortBy from '../../ui/SortBy';
function useGetNotifications(notificationsDate) {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    // // FILTER
    // const filterValue = searchParams.get('status');
    // const filter =
    //   !filterValue || filterValue === 'all'
    //     ? null
    //     : { field: 'status', value: filterValue };
    // // { field: "totalPrice", value: 5000, method: "gte" };
  
    // // SORT
    const getArrayOfThreeDays = (baseDate) => {
        const arrayOfThreeDays = [];
        for (let i = 0; i < 3; i++) {
          const date = new Date(baseDate);
          date.setDate(date.getDate() - i);
          arrayOfThreeDays.push(date.toISOString().split('T')[0]);
        }
        return arrayOfThreeDays;
    };
    
    // Example usage with one day (today) and the previous two days
    const today = new Date(notificationsDate);
    const arrayOfThreeDays = getArrayOfThreeDays(today);

    const sortByRaw = searchParams.get('NotificationSortedByTable') ? searchParams.get('NotificationSortedByTable') : "sellers" ;
    const dateFilter = searchParams.get('NotificationSortedByDate');

    
  
    const filter =
    sortByRaw?.trim() === 'companies'
      ? { tableName: 'companies_transaction' , select :  '* , companies (*)'}
      : sortByRaw?.trim() === 'localCustomers'
      ? { tableName: 'seller_transaction', type: "Local" , select : '* , sellers!inner(*)'}
      : sortByRaw?.trim() === 'foreignCustomers'
      ? { tableName: 'seller_transaction', type: "Oversea" , select : '* , sellers!inner(*)'}
      : sortByRaw?.trim() === 'loans'
      ? { tableName: 'debtor_transaction' , select : '* , debtor ()'} : { tableName: 'companies_transaction' ,select : '*, companies (*)'};
  
    // PAGINATION
    
  
    // QUERY
    
  const {
    error,
    isLoading,
    data: notifications,
  } = useQuery({
    queryKey: ['notifications' ,filter , arrayOfThreeDays ],
    queryFn: () => {
      return getNotification({filter , arrayOfThreeDays});
    },
  });

  return { error, isLoading, notifications };
}

export default useGetNotifications;