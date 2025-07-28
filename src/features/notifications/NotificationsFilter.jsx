import React, { useState } from 'react';
import { HiMiniFunnel } from 'react-icons/hi2';
import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import RadioGroup from '../../ui/RadioGroup';
import Row from '../../ui/Row';
import { useSearchParams } from 'react-router-dom';
function NotificationsFilter({ notificationsSource, setNotificationsSource, notificationsDate, setNotificationsDate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleData(value) {
    const date = new Date(value + "T00:00:00Z");  // Assuming the input date is in UTC
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }


  // console.log(notificationsDate)



  function handleNotificationtype(value) {
    setNotificationsSource(value);
    searchParams.set("NotificationSortedByTable", value);
    setSearchParams(searchParams);
  }
  return (
    <Dropdown openIcon={<HiMiniFunnel />} title="ئاگادارکردنەوەکان">
      <MenuItem>
        <DropdownItem>
          <RadioGroup
            filterState={notificationsSource}
            setFilterState={handleNotificationtype}
            name="notificationsSource"
            options={[
              // { value: 'all', label: 'هەمووی' },
              { value: 'localCustomers', label: 'کڕیاری ناوخۆ' },
              { value: 'foreignCustomers', label: 'کڕیاری دەرەوە' },
              { value: 'companies', label: 'شەریکات' },
              { value: 'loans', label: 'قەرزەکان' },
            ]}
          />
        </DropdownItem>
      </MenuItem>

      <MenuItem>
        <DropdownItem>
          <Row type="vertical">
            <p>Choose Date</p>
            <input
              type="date"
              value={notificationsDate}
              onChange={e => setNotificationsDate(handleData(e.target.value))}
              className="input smallInput InputSecondary w-80"
            />
          </Row>
        </DropdownItem>
      </MenuItem>
    </Dropdown>
  );
}

export default NotificationsFilter;
