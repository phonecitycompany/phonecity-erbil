// import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
// import SortBy from '../../ui/SortBy';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function LoanList({ loansItem, loanId, setLoanId }) {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // const searchParamsSellerValue = searchParams.get('seller');
    // if (searchParamsSellerValue) {
    //   setloanId(searchParamsSellerValue);
    // }
    if (loanId) {
      searchParams.set('loan', loanId);
      setSearchParams(searchParams);
    }
  }, [loanId]);

  return (
    <div className="relative flex w-1/2 flex-col">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className=" rtl flex w-full cursor-pointer flex-row items-center justify-between rounded-xl bg-main p-3 hover:bg-main-dark"
      >
        <p className="text-white">
          {loansItem?.find(seller => seller.id == loanId)?.debtor_name}
        </p>
        <IoIosArrowDropdownCircle className="text-5xl text-white" />
      </div>
      {open === true && (
        <div className="absolute top-full z-10 mt-2 max-h-96 w-full overflow-y-scroll rounded-xl border-2 bg-white p-6 shadow-md">
          {loansItem?.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setOpen(false);
                  setLoanId(item.id);
                  searchParams.delete('startDate');
                  searchParams.delete('endDate');
                  searchParams.delete('date');
                  searchParams.delete('sortBy');
                  searchParams.delete('seller');
                  searchParams.delete('page');
                  setSearchParams(searchParams);
                }}
                className="cursor-pointer rounded-lg p-4 text-3xl hover:bg-gray-100"
              >
                {item?.debtor_name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LoanList;
