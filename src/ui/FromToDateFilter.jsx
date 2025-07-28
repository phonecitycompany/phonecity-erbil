import { useSearchParams } from 'react-router-dom';
import Row from './Row';
import { useEffect, useState } from 'react';
import { set } from 'date-fns';

function FromToDateFilter({
  classForHeading,
  className2,
  startDateValue = 'startDate',
  endDateValue = 'endDate',
  type = 'horizontal',
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newDate, setNewDate] = useState('');
  const [dateStartValue, setDateStartValue] = useState('');
  const [dateEndValue, setDateEndValue] = useState('');
  const [range, setRange] = useState('');
  useEffect(() => {
    const startDateParam = searchParams.get(startDateValue);
    const endDateParam = searchParams.get(endDateValue);
    if (startDateParam) {
      setDateStartValue(startDateParam);
    }
    if (endDateParam) {
      setDateEndValue(endDateParam);
    } else {
      setDateEndValue('');
      setDateStartValue('');
    }
    handleDateRange(startDate, endDate);
  }, [startDate, endDate]);

  function formatDateStringToYYYYMMDD(dateString) {
    if (dateString) {
      const [month, day, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    } else {
      return '';
    }
  }
  function handleDateRange(startValue, endValue) {
    let startDate = startValue ? new Date(startValue) : null;
    let endDate = endValue ? new Date(endValue) : null;

    if (!startDate || !endDate) {
      return;
    }

    let formattedStartDate = startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let formattedEndDate = endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    searchParams.set(startDateValue, formattedStartDate);
    searchParams.set(endDateValue, formattedEndDate);
    searchParams.delete('date');
    searchParams.delete('sortBy');
    setDateEndValue(formattedEndDate);
    setDateStartValue(formattedStartDate);
    setSearchParams(searchParams);
  }

  function handleDateChange(e) {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    currentDate.setDate(currentDate.getDate() - range);
    const endDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    searchParams.set(startDateValue, endDate);
    searchParams.set(endDateValue, formattedDate);
    searchParams.delete('date');
    searchParams.delete('sortBy');

    if (range === '') {
      searchParams.delete(startDateValue);
      searchParams.delete(endDateValue);
    }

    setSearchParams(searchParams);
  }

  return (
    <Row type="vertical">
      <p className={classForHeading}>ڕۆژی مەبەست دیاری بکە</p>

      <Row type={type}>
        {/* <div className="input ltr flex w-full flex-row justify-between">
          <form
            onSubmit={e => {
              handleDateChange(e);
            }}
          >
            <input
              className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              min={0}
              name="fromTodatepicker"
              onChange={e => setRange(e.target.value)}
            />
          </form>
        </div> */}
        <input
          type="date"
          value={formatDateStringToYYYYMMDD(dateEndValue)}
          onChange={e => setEndDate(e.target.value)}
          className={`input smallInput mr-2 ${className2}`}
        />
        <p className="text-2xl">تا</p>

        <input
          type="date"
          value={formatDateStringToYYYYMMDD(dateStartValue)}
          onChange={e => setStartDate(e.target.value)}
          className={`input smallInput mx-2 ${className2}`}
        />
        <p className="text-2xl">لە</p>
      </Row>
    </Row>
  );
}

export default FromToDateFilter;
