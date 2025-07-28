import { useSearchParams } from 'react-router-dom';
import Row from './Row';
import { useEffect, useState } from 'react';

function DateFilter({ className, className2, dateName = 'date' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateValue, setDateValue] = useState('');
  function formatDateStringToYYYYMMDD(dateString) {
    if (dateString) {
      const [month, day, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    } else {
      return '';
    }
  }

  useEffect(() => {
    const dateParam = searchParams.get(dateName);
    if (dateParam) {
      setDateValue(dateParam);
    }
  }, []);
  function handleData(value) {
    let date = new Date(value);

    if (isNaN(date.getTime())) {
      return;
    }

    let formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    searchParams.set(dateName, formattedDate);
    setDateValue(formattedDate);
    searchParams.delete('startDate');
    searchParams.delete('endDate');
    searchParams.delete('sortBy');
    setSearchParams(searchParams);
  }

  return (
    <Row type="vertical">
      <p className={` ${className}`}>ڕۆژی مەبەست دیاری بکە</p>
      <input
        type="date"
        name="date_picker"
        value={formatDateStringToYYYYMMDD(dateValue)}
        onChange={e => handleData(e.target.value)}
        className={`input smallInput  min-w-80 ${className2} `}
      />
    </Row>
  );
}

export default DateFilter;
