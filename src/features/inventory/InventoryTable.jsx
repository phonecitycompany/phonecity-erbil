// import BookingRow from './BookingRow';

import { useInventoryItems } from './useInventoryItems';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import InventoryRow from './InventoryRow';
import Empty from '../../ui/Empty';
import Button from '../../ui/Button';
import { IoIosCloseCircle } from 'react-icons/io';
import SingleInvoice from '../../pages/SingleInvoice';
import { useState } from 'react';

function InventoryTable({ isAdmin }) {
  const { inventoryItems, isLoading, count } = useInventoryItems();
  const [showInvoice, setShowInvoice] = useState(false);

  if (isLoading) return <Spinner />;

  if (!inventoryItems.length) return <Empty resourceName="inventoryItems" />;

  return (
    <>
      {showInvoice && (
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gray-100">
          <div className="rtl  p-7">
            <IoIosCloseCircle
              onClick={() => {
                setShowInvoice(false);
              }}
              className="cursor-pointer text-7xl text-main"
            />
          </div>
          <SingleInvoice
            type="inventory"
            data={inventoryItems}
            isCompany={true}
            setShowInvoice={setShowInvoice}
          />
        </div>
      )}
      <Table columns="inventoryTable">
        <Table.Header>
          <div></div>
          <div>کۆی نرخی کاڵاکان</div>
          <div>نرخی کاڵا</div>
          <div>بڕێ كاڵای فرۆشراو</div>
          <div>بڕێ کاڵا</div>
          <div>ناوی کاڵا</div>
        </Table.Header>

        <Table.Body
          data={inventoryItems}
          render={item => (
            <InventoryRow item={item} key={item.id} isAdmin={isAdmin} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
      <Button
        onClick={() => {
          setShowInvoice(true);
        }}
        className="ml-auto !duration-200 focus:!outline-none"
      >
        کەشف حساب
      </Button>
    </>
  );
}

export default InventoryTable;

// const items = [
//   {
//     id: 1,
//     item_name: 'iphone x',
//     item_quantity: 10,
//     total_sell: 1,
//     item_price: 1000,
//     total_price: 9000,
//   },
//   {
//     id: 2,
//     item_name: 'iphone xr',
//     item_quantity: 10,
//     total_sell: 1,
//     item_price: 340,
//     total_price: 75000,
//   },
//   {
//     id: 3,
//     item_name: 'iphone 12',
//     item_quantity: 10,
//     total_sell: 1,
//     item_price: 870,
//     total_price: 45000,
//   },
//   {
//     id: 4,
//     item_name: 'iphone 11',
//     item_quantity: 10,
//     total_sell: 1,
//     item_price: 600,
//     total_price: 12000,
//   },
// ];
