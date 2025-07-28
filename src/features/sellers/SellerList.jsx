// import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
// import SortBy from '../../ui/SortBy';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function SellerList({ sellerItem, sellerid, setSellerid, className }) {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // const searchParamsSellerValue = searchParams.get('seller');
    // if (searchParamsSellerValue) {
    //   setSellerid(searchParamsSellerValue);
    // }
    if (sellerid) {
      searchParams.set('seller', sellerid);
      setSearchParams(searchParams);
    }
  }, [sellerid]);

  return (
    <div className={`relative flex w-1/2 flex-col ${className}`}>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className=" rtl flex w-full cursor-pointer flex-row items-center justify-between rounded-xl bg-main p-3 hover:bg-main-dark"
      >
        <p className="text-2xl text-white">
          {sellerItem?.find(seller => seller.id == sellerid)?.seller_name ||
            'ناوی كڕیار'}
        </p>
        <IoIosArrowDropdownCircle
          className={`text-4xl text-white transition-all duration-200 ease-in-out ${open === true && 'rotate-180'} `}
        />
      </div>
      {open === true && (
        <div className="absolute top-full z-10 mt-2 max-h-96 w-full overflow-y-scroll rounded-xl border-2 bg-white p-6 shadow-md">
          {sellerItem?.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setOpen(false);
                  setSellerid(item.id);
                  searchParams.delete('startDate');
                  searchParams.delete('endDate');
                  searchParams.delete('date');
                  searchParams.delete('sortBy');
                  searchParams.delete('seller');
                  searchParams.delete('page');
                  setSearchParams(searchParams);
                }}
                className="cursor-pointer rounded-lg p-4 text-2xl hover:bg-gray-100"
              >
                {item.seller_name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SellerList;
