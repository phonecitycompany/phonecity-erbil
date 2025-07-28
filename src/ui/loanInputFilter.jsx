import { useSearchParams } from 'react-router-dom';
import Row from './Row';
import { useEffect, useState } from 'react';
import { set } from 'date-fns';

function LoanInputFilter({
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
        <div className="input ltr flex w-full flex-row justify-between">
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
              onChange={e => setRange(e.target.value - 1)}
            />
          </form>
        </div>
      </Row>
    </Row>
  );
}

export default LoanInputFilter;
