import { useSearchParams } from 'react-router-dom';
import Row from './Row';
import { useEffect, useState } from 'react';
import { set } from 'date-fns';

function InputFilter({
  classForHeading,
  className2,
  startDateValue = 'startDate',
  endDateValue = 'endDate',
  type = 'horizontal',
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [range, setRange] = useState('');

  function handleDateChange(e) {
    e.preventDefault();
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() - range);
    const endDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    searchParams.set('belowDateValue', endDate);

    searchParams.delete('date');
    searchParams.delete('sortBy');
    searchParams.delete('startDate');
    searchParams.delete('endDate');

    if (range === '') {
      searchParams.delete('belowDateValue');
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
              onChange={e => setRange(e.target.value)}
            />
          </form>
        </div>
      </Row>
    </Row>
  );
}

export default InputFilter;
