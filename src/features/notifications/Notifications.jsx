import LoanNotificationList from './LoanNotificationList';
import useGetNotifications from './useGetNotifications';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Notifications({ notificationsDate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isall, setIsAll] = useState(false);
  const getArrayOfThreeDays = (baseDate) => {
    const arrayOfThreeDays = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - i);
      arrayOfThreeDays.push(date.toISOString().split('T')[0]);
    }
    return arrayOfThreeDays;
  };
  useEffect(() => {
    if (searchParams.get('NotificationSortedByTable') == "all") {
      setIsAll(true);
    }
  }, [searchParams.get('NotificationSortedByTable')])
  // Example usage with one day (today) and the previous two days
  const { error, isLoading, notifications } = useGetNotifications(notificationsDate)

  if (isLoading) return <div>loading...</div>

  const today = new Date(notificationsDate);
  const arrayOfThreeDays = getArrayOfThreeDays(today);
  const todaysData = notifications?.data?.filter((item) => {
    return item?.returning_date === arrayOfThreeDays[0] || item?.returning_date_reminder === arrayOfThreeDays[0];
  });
  const yesterdayData = notifications?.data?.filter((item) => {
    return item?.returning_date === arrayOfThreeDays[1] || item?.returning_date_reminder === arrayOfThreeDays[1];
  });
  const daybeforeYesterdayData = notifications?.data?.filter((item) => {
    return item?.returning_date === arrayOfThreeDays[2] || item?.returning_date_reminder === arrayOfThreeDays[2];
  });
  return <LoanNotificationList arrayOfThreeDays={arrayOfThreeDays} todaysData={todaysData} yesterdayData={yesterdayData} daybeforeYesterday={daybeforeYesterdayData} />;
}

export default Notifications;
