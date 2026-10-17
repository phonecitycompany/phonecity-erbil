// import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import { IoIosArrowDropdownCircle, IoIosSearch } from 'react-icons/io';
// import SortBy from '../../ui/SortBy';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const ref = useOutsideClick(() => {
    if (open) {
      setOpen(false);
      setSearchTerm('');
    }
  }, false);

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

  const filteredItems = sellerItem?.filter(item =>
    item?.item_name
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <div ref={ref} className={`relative flex w-1/2 flex-col ${className}`}>
      <div
        onClick={() => {
          setOpen(prev => !prev);
          setSearchTerm('');
        }}
        className=" rtl flex w-full cursor-pointer flex-row items-center justify-between rounded-xl bg-main p-3 hover:bg-main-dark"
      >
        <p className="text-xl text-white">
          {sellerItem?.find(seller => seller.id == itemid)?.item_name ||
            'ناوی کاڵا'}
        </p>
        <IoIosArrowDropdownCircle
          className={`text-4xl text-white transition-all duration-200 ease-in-out ${open === true ? 'rotate-180' : ''} `}
        />
      </div>
      {open === true && (
        <div className="absolute top-full z-30 mt-2 flex max-h-96 w-full flex-col overflow-hidden rounded-xl border-2 border-gray-100 bg-white shadow-xl">
          <div
            className="rtl flex items-center gap-2 border-b border-gray-200 bg-gray-50 p-3"
            onClick={e => e.stopPropagation()}
          >
            <IoIosSearch className="flex-shrink-0 text-3xl text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="گەڕان بەدوای کاڵا..."
              className="w-full bg-transparent text-xl text-gray-800 outline-none placeholder:text-gray-400"
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  setSearchTerm('');
                }}
                className="flex-shrink-0 px-1 text-lg text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto p-2">
            {filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((item, i) => {
                return (
                  <div
                    key={item.id || i}
                    onClick={() => {
                      setOpen(false);
                      setSearchTerm('');
                      setItemName(item.item_name);
                      setItemid(item.id);
                      setValue('item_price', item.item_price);
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-lg p-3 text-2xl hover:bg-gray-100 rtl transition-colors ${
                      itemid == item.id
                        ? 'bg-blue-50 font-bold text-main'
                        : 'text-gray-800'
                    }`}
                  >
                    <span>{item.item_name}</span>
                    <span className="text-xl text-gray-500">
                      {item.item_quantity}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-xl text-gray-500 rtl">
                هیچ کاڵایەک نەدۆزرایەوە
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemList;