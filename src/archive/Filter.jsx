import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1);

    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-1 rounded-sm border border-gray-100 bg-gray-50 p-1 shadow-sm">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={classNames(
            'rounded-sm px-3 py-1 text-sm font-medium transition-all',
            {
              'bg-blue-600 text-white': option.value === currentFilter,
              'cursor-not-allowed bg-gray-50 text-gray-700':
                option.value === currentFilter,
              'hover:bg-blue-600 hover:text-white':
                option.value !== currentFilter,
            },
          )}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
