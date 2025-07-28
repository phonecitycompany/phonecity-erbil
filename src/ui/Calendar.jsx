import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Heading from './Heading';
import Row from './Row';

const daysOfWeekInKurdish = [
  'شەمە',
  'یەکشەممە',
  'دووشەممە',
  'سێشەممە',
  'چوارشەممە',
  'پێنجشەممە',
  'هەینی',
];

const Calendar = () => {
  const [time, setTime] = useState(moment().format('LT'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('LT'));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const date = new Date();

  const formatDate = date => {
    return moment(date).locale('ku').format('YYYY-MM-DD');
  };

  const today = formatDate(date);
  const dayOfWeek = moment(date).locale('ku').day();
  const dayOfWeekInKurdish = (dayOfWeek + 1) % 7;

  return (
    <div className="flex lg:gap-10 gap-5 flex-shrink-0">
      <Heading as="h2">{today}</Heading>
      <Heading as="h2" className="ltr">
        {time}
      </Heading>
      <Heading as="h2">{daysOfWeekInKurdish[dayOfWeekInKurdish]}</Heading>
    </div>
  );
};

export default Calendar;
