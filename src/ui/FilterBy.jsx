import { useSearchParams } from 'react-router-dom';
import RadioGroup from './RadioGroup';

function FilterBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('filterBy') || '';

  function handleClick(value) {
    searchParams.set('filterBy', value);

    setSearchParams(searchParams);
  }

  return (
    <div>
      <RadioGroup
        filterState={sortBy}
        setFilterState={handleClick}
        name="filterBy"
        options={options}
      />
    </div>
  );
}

export default FilterBy;

// <SortBy
//   options={[
//     { value: 'highToLow ', label: 'گرانترین کاڵا' },
//     { value: 'lowToHigh ', label: 'هەرزانترین کاڵا' },
//   ]}
// />;
