import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import ResetFilter from '../../ui/ResetFillter';

import SortBy from '../../ui/SortBy';

function InventoryFilters() {
  return (
    <Dropdown openButton="پاڵفتە کردن" className="w-80" title="مەخزەن">
      <MenuItem>
        <DropdownItem>
          <SortBy
            options={[
              { value: 'prodHighToLow', label: 'زۆرترین بڕی کاڵا' },
              { value: 'prodLowToHigh', label: 'کەمترین بڕی کاڵا' },
              { value: 'highToLow ', label: 'گرانترین کاڵا' },
              { value: 'lowToHigh ', label: 'هەرزانترین کاڵا' },
              { value: 'mostSold ', label: 'زۆرترین کاڵای فرۆشراو' },
              { value: 'leastSold ', label: 'کەمترین کاڵای فرۆشراو' },
            ]}
          />
        </DropdownItem>
      </MenuItem>
      <ResetFilter className="mt-2" />
    </Dropdown>
  );
}

export default InventoryFilters;
