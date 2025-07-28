import DateFilter from '../../ui/DateFilter';
import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import FromToDateFilter from '../../ui/FromToDateFilter';
import ResetFilter from '../../ui/ResetFillter';
import SortBy from '../../ui/SortBy';
import InputFilter from '../../ui/InputFilter';

function FilterPartnersTransaction() {
  return (
    <Dropdown openButton="پاڵفتە کردن" className="" title="خاوەن پشک">
      <MenuItem>
        <DropdownItem>
          <SortBy
            options={[
              { value: 'outLowToHigh', label: 'کەمترین پارەی ڕاکێشراو' },
              { value: 'outHighToLow', label: 'زۆرترین پارەی ڕاکێشراو' },
              { value: 'ingoingHighToLow', label: 'زۆرتری پارەی هاتوو' },
              { value: 'ingoingLowToHigh', label: 'کامترین پارەی هاتوو' },
            ]}
          />
        </DropdownItem>
        <DropdownItem>
          <DateFilter className2="!p-3 !text-2xl " />
        </DropdownItem>
        <DropdownItem>
          <FromToDateFilter className2="!p-3 !text-2xl " />
        </DropdownItem>
        <DropdownItem>
          <InputFilter className2="!p-3 !text-2xl " />
        </DropdownItem>
      </MenuItem>
      <ResetFilter className="mt-2" />
    </Dropdown>
  );
}

export default FilterPartnersTransaction;
