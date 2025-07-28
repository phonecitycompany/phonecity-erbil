import Heading from '../../ui/Heading';
import Notifications from './Notifications';
import NotificationsFilter from './NotificationsFilter';
import Row from '../../ui/Row';
import { useState } from 'react';

function NotificationsSidebar() {
  const [notificationsDate, setNotificationsDate] = useState(() => {
    const currentDate = new Date();

    // Adjust for the time zone offset
    const timezoneOffset = currentDate.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  });
  const [notificationsSource, setNotificationsSource] = useState('companies');

  return (
    <div className="grid h-full grid-rows-[5rem_1fr] gap-10">
      <Row type="horizontal">
        <NotificationsFilter notificationsSource={notificationsSource} setNotificationsSource={setNotificationsSource} notificationsDate={notificationsDate} setNotificationsDate={setNotificationsDate} />

        <Heading as="h2">ئاگاداریەکان</Heading>
      </Row>

      <div className="mr-[-1.35rem] overflow-y-scroll pr-3 text-lg lg:text-2xl">
        <Notifications notificationsDate={notificationsDate} />
      </div>
    </div>
  );
}

export default NotificationsSidebar;
