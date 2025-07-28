import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

function Pagination({ count, filterBy = 'page' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get(filterBy)
    ? 1
    : Number(searchParams.get(filterBy));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set(filterBy, next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set(filterBy, prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between ">
      <p className="text-lg font-medium">
        پشاندانی
        <span className="px-2 font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>
        تا
        <span className="px-2 font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>
        لە <span className="font-semibold">{count}</span> ئەنجام
      </p>

      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1
              ? 'cursor-not-allowed bg-gray-200 text-gray-500'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } flex items-center rounded-md px-4 py-2 font-medium`}
        >
          <HiChevronLeft className="h-6 w-6" />
          <span>پێشتر</span>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`${
            currentPage === pageCount
              ? 'cursor-not-allowed bg-gray-200 text-gray-500'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } flex items-center rounded-md px-4 py-2 font-medium`}
        >
          <span>دواتر</span>
          <HiChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
