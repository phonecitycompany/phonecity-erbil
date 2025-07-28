import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getcapitalvalueByDate } from '../../services/apiCapital';
export function useGetAllCapital() {
  // Create an array to store the previous 6 dates
  const previousDates = [];
  const currentDate = new Date();

  for (let i = 1; i <= 6; i++) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - i);
    previousDates.push(previousDate.toISOString().split('T')[0]);
  }

  const today = new Date().toISOString().split('T')[0];
  const onedayAgo = previousDates[0];
  const twodayAgo = previousDates[1];
  const threedayAgo = previousDates[2];
  const fourdayAgo = previousDates[3];
  const fivedayAgo = previousDates[4];
  const sixdayAgo = previousDates[5];

  // QUERY
  const {
    isLoading: lodaingone,
    data: { data: capitalItemone, countone } = {},
  } = useQuery({
    queryKey: ['capitalEarn1', onedayAgo],
    queryFn: () => getcapitalvalueByDate({ filterEndDate: onedayAgo }),
  });
  const {
    isLoading: lodaingtwo,
    data: { data: capitalItemtwo, counttwo } = {},
  } = useQuery({
    queryKey: ['capitalEarn1', twodayAgo],
    queryFn: () => getcapitalvalueByDate({ filterEndDate: twodayAgo }),
  });
  const {
    isLoading: lodaingthree,
    data: { data: capitalItemthree, countthree } = {},
  } = useQuery({
    queryKey: ['capitalEarn1', threedayAgo],
    queryFn: () => getcapitalvalueByDate({ filterEndDate: threedayAgo }),
  });
  const {
    isLoading: lodaingfour,
    data: { data: capitalItemfour, countfour } = {},
  } = useQuery({
    queryKey: ['capitalEarn1', fourdayAgo],
    queryFn: () => getcapitalvalueByDate({ filterEndDate: fourdayAgo }),
  });
  const {
    isLoading: lodaingfive,
    data: { data: capitalItemfive, countfive } = {},
  } = useQuery({
    queryKey: ['capitalEarn1', fivedayAgo],
    queryFn: () => getcapitalvalueByDate({ filterEndDate: fivedayAgo }),
  });
  const {
    isLoading: lodaingsix,
    data: { data: capitalItemsix, countsix } = {},
  } = useQuery({
    queryKey: ['capitalEarn1', sixdayAgo],
    queryFn: () => getcapitalvalueByDate({ filterEndDate: sixdayAgo }),
  });

  const {
    isLoading: loadingSecond,
    data: { data: capitalItemToday, count: countSecond } = {},
  } = useQuery({
    queryKey: ['capitalEarn2', today],
    queryFn: () => getcapitalvalueByDate({ filterEndDate: today }),
  });
  // console.log(capitalItem);
  const newCombinedData = {
    capitalItemone,
    capitalItemtwo,
    capitalItemthree,
    capitalItemfour,
    capitalItemfive,
    capitalItemsix,
    capitalItemToday,
  };

  return {
    lodaingone,
    lodaingtwo,
    lodaingthree,
    lodaingfour,
    lodaingfive,
    lodaingsix,
    loadingSecond,
    countone,
    counttwo,
    countthree,
    countfour,
    countfive,
    countsix,
    countSecond,
    newCombinedData,
  };
}
