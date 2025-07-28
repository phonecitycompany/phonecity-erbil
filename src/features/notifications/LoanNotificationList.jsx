import Heading from '../../ui/Heading';
import LoanNotificationRow from './LoanNotificationRow';
import Row from '../../ui/Row';

const LoanNotificationList = ({ arrayOfThreeDays, todaysData, yesterdayData, daybeforeYesterday, allNotification }) => {

  return (
    <>
      <div className="mb-6 flex items-center justify-end gap-3 text-xl font-bold">
        <Heading as="h3">{arrayOfThreeDays[0]} </Heading>
        <Heading as="h3">بەرواری</Heading>
      </div>
      {todaysData?.map((noti) => (
        <div key={noti.id} className="mb-20">

          <LoanNotificationRow notification={noti} todaysValue={arrayOfThreeDays[0]} />

        </div>
      ))}
      {allNotification && allNotification?.map((noti) => (
        (noti.data.returning_date == arrayOfThreeDays[0] || noti.data.returning_date_reminder == arrayOfThreeDays[0]) &&
        (<div key={noti.data.id} className="mb-20">
          <LoanNotificationRow notification={noti.data} todaysValue={arrayOfThreeDays[0]} />

        </div>)
      ))}

      <div className="mb-6 flex items-center justify-end gap-3 text-xl font-bold">
        <Heading as="h3">{arrayOfThreeDays[1]} </Heading>
        <Heading as="h3">بەرواری</Heading>
      </div>
      {yesterdayData?.map((noti) => (
        <div key={noti.id} className="mb-20 opacity-80">

          <LoanNotificationRow notification={noti} todaysValue={arrayOfThreeDays[1]} />

        </div>
      ))}
      {allNotification && allNotification?.map((noti) => (
        (noti.data.returning_date == arrayOfThreeDays[1] || noti.data.returning_date_reminder == arrayOfThreeDays[1]) &&
        (<div key={noti.data.id} className="mb-20">
          <LoanNotificationRow notification={noti.data} todaysValue={arrayOfThreeDays[1]} />

        </div>)
      ))}
      <div className="mb-6 flex items-center justify-end gap-3 text-xl font-bold">
        <Heading as="h3">{arrayOfThreeDays[2]} </Heading>
        <Heading as="h3">بەرواری</Heading>
      </div>
      {daybeforeYesterday?.map((noti) => (
        <div key={noti.id} className="mb-20 opacity-80">

          <LoanNotificationRow notification={noti} todaysValue={arrayOfThreeDays[2]} />

        </div>
      ))}
      {allNotification && allNotification?.map((noti) => (
        (noti.data.returning_date == arrayOfThreeDays[2] || noti.data.returning_date_reminder == arrayOfThreeDays[2]) &&
        (<div key={noti.data.id} className="mb-20">
          <LoanNotificationRow notification={noti.data} todaysValue={arrayOfThreeDays[2]} />

        </div>)
      ))}
    </>
  );
};

export default LoanNotificationList;
