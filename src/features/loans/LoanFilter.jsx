import DateFilter from '../../ui/DateFilter';
import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import FromToDateFilter from '../../ui/FromToDateFilter';
import ResetFilter from '../../ui/ResetFillter';
import SortBy from '../../ui/SortBy';
import LoanInputFilter from '../../ui/loanInputFilter';

function LoanFilter() {
  return (
    <Dropdown openButton="پاڵفتە کردن" className="" title="كڕیار">
      <MenuItem>
        <DropdownItem className="w-72">
          <SortBy
            options={[
              { value: 'nameAtoZ', label: 'بەپێی پیت (A - Z)' },
              { value: 'nameZtoA', label: 'بەپێی پیت (Z - A)' },
              { value: 'totalLowToHigh', label: 'کەمترین پارەی قەرزکراو' },
              { value: 'totalHighToLow', label: 'زۆرترین پارەی قەرز کراو' },
            ]}
          />
        </DropdownItem>
        <DropdownItem>
          <FromToDateFilter className2="!p-3 !text-2xl " />
        </DropdownItem>
        <DropdownItem>
          <LoanInputFilter className2="!p-3 !text-2xl " />
        </DropdownItem>
      </MenuItem>
      <ResetFilter className="mt-2" />
    </Dropdown>
  );
}

export default LoanFilter;
