// import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
// import SortBy from '../../ui/SortBy';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function ItemList({
  sellerItem,
  itemid,
  setItemName,
  itemName,
  setItemid,
  className,
  setValue,
}) {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // const searchParamsSellerValue = searchParams.get('seller');
    // if (searchParamsSellerValue) {
    //   setSellerid(searchParamsSellerValue);
    // }
    if (itemid) {
      searchParams.set('items', itemid);
      setSearchParams(searchParams);
    }
  }, [itemid]);

  return (
    <div className={`relative flex w-1/2 flex-col  ${className}`}>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className=" rtl flex w-full cursor-pointer flex-row items-center justify-between rounded-xl bg-main p-3 hover:bg-main-dark"
      >
        <p className="text-xl text-white">
          {sellerItem?.find(seller => seller.id == itemid)?.item_name ||
            'ناوی کاڵا'}
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
                  setItemName(item.item_name);
                  setItemid(item.id);
                  setValue('item_price', item.item_price);
                }}
                className="flex cursor-pointer items-center justify-between rounded-lg p-4 text-2xl hover:bg-gray-100"
              >
                <span>{item.item_name}</span>
                <span>{item.item_quantity}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ItemList;