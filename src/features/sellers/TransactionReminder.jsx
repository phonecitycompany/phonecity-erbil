import React, { useState } from 'react'
import RadioGroup from '../../ui/RadioGroup'
import { useSearchParams } from 'react-router-dom';
import Row from '../../ui/Row';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useEditTransaction } from './useEditTransaction';
export default function TransactionReminder({ returning_date, returning_date_reminder, onCloseModal, transactionItamId }) {
  const date1 = returning_date ? new Date(returning_date) : '';
  const date2 = returning_date_reminder ? new Date(returning_date_reminder) : '';
  const { editTransactionItem, isEditting } = useEditTransaction();

  const timeDifference = date1 - date2;
  const [returning_date_state, setReturning_date_state] = useState(returning_date)
  // Convert milliseconds to days
  const [daysDifference, setDateDiffrence] = useState(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));

  const [searchParams] = useSearchParams();
  const [reminderDay, setReminderDate] = useState(searchParams.get('reminderDay') ? searchParams.get('reminderDay') : daysDifference == 0 ? 'sameDay' : daysDifference == 2 ? 'twoDayBefore' : daysDifference == 5 ? 'fiveDayBefore' : daysDifference == 10 ? 'tenDayBefore' : '')
  function changeDateToYYYY_MM_DD(numberOfDays) {
    const date = new Date(returning_date_state);
    date.setDate(date.getDate() - numberOfDays);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function checkReminderDay() {
    if (reminderDay == 'sameDay') {
      return returning_date_state
    } else if (reminderDay == 'twoDayBefore') {
      return changeDateToYYYY_MM_DD(2)
    } else if (reminderDay == 'fiveDayBefore') {
      return changeDateToYYYY_MM_DD(5)
    } else if (reminderDay == 'tenDayBefore') {
      return changeDateToYYYY_MM_DD(10)
    }
  }

  function handleClick(value) {
    setReminderDate(value);
    setDateDiffrence(checkReminderDay())
  }

  const options = [
    { value: 'sameDay', label: 'هەمان ڕۆژ' },
    { value: 'twoDayBefore', label: 'دوو ڕۆژ پێشتر' },
    { value: 'fiveDayBefore', label: 'پێنج ڕۆژ پێشتر' },
    { value: 'tenDayBefore', label: 'دە ڕۆژ پێشتر' },
  ]

  function handleData(value) {

    let date = new Date(value);

    if (isNaN(date.getTime())) {
      return;
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setReturning_date_state(formattedDate)

  }
  function submitreminderDate() {

    editTransactionItem({
      newTransaction: {
        returning_date: returning_date_state,
        returning_date_reminder: checkReminderDay()
      },
      id: transactionItamId,
    });
    if (!isEditting) {

      onCloseModal();
    }
  }
  return (
    <div>
      <div className=' flex flex-col items-end gap-6'>
        <h1 className='text-4xl mb-5'>گۆڕینی ڕۆژی ئاگادارکردنەوە</h1>
        <Row type="vertical">
          <p className={` `}>ڕۆژی مەبەست دیاری بکە</p>
          <input
            type="date"
            value={returning_date_state}
            onChange={e => handleData(e.target.value)}
            className={`input  min-w-80  h-12 text-xl`}
          />
        </Row>
        <div className='mt-5'>
          <h1 className='text-4xl mb-5'>چەندڕۆژ پێشتر ئاگادار بکرێیتەوە</h1>
          <RadioGroup
            name="reminderDay"
            className="!flex-row-reverse !justify-center !items-center"
            filterState={reminderDay}
            setFilterState={handleClick}
            options={options} />
        </div>
        <div className="mt-8 flex justify-center gap-5">
          <Button
            type="button"
            variation="confirm"
            onClick={onCloseModal}
            className="mt-6 bg-gray-200 text-gray-700"
          >
            پەشیمانبونەوە
          </Button>
          <Button
            className="mt-6"
            disabled={isEditting}
            type="button"
            variation="confirm"
            size="large"
            onClick={submitreminderDate}
          >
            {!isEditting ? 'تۆمارکردن' : <SpinnerMini />}
          </Button>
        </div>
      </div>
    </div>
  )
}
