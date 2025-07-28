import { useSearchParams } from 'react-router-dom';
import RadioGroup from './RadioGroup';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);

    if (searchParams.get('page')) searchParams.set('page', 1);

    setSearchParams(searchParams);
  }

  return (
    <div>
      <RadioGroup
        filterState={currentFilter}
        setFilterState={handleClick}
        name="filter"
        options={options}
      />
    </div>
  );
}

export default Filter;

// <Filter
//   filterField="notificationSorce"
//   options={[
//     { value: 'all', label: 'هەمووی' },
//     { value: 'localCustomers', label: 'کڕیاری ناوخۆ' },
//     { value: 'foreignCustomers', label: 'کڕیاری دەرەوە' },
//     { value: 'companies', label: 'شەریکات' },
//     { value: 'Debts', label: 'قەرزەکان' },
//   ]}
// />;
