import { useSearchParams } from 'react-router-dom';
import RadioGroup from './RadioGroup';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function handleClick(value) {
    searchParams.set('sortBy', value);
    searchParams.delete('date');
    searchParams.delete('startDate');
    searchParams.delete('endDate');
    setSearchParams(searchParams);
  }

  return (
    <div>
      <RadioGroup
        filterState={sortBy}
        setFilterState={handleClick}
        name="sortBy"
        options={options}
      />
    </div>
  );
}

export default SortBy;

// <SortBy
//   options={[
//     { value: 'highToLow ', label: 'گرانترین کاڵا' },
//     { value: 'lowToHigh ', label: 'هەرزانترین کاڵا' },
//   ]}
// />;
