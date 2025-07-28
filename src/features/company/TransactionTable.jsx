// import BookingRow from './BookingRow';

import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import TransactionRow from './TransactionRow';
import Empty from '../../ui/Empty';

function TransactionTable({
  transactionItems,
  isLoading,
  count,
  companyItem,
  companyId,
  isAdmin,
}) {
  if (isLoading) return <Spinner />;

  if (!transactionItems.length)
    return <Empty resourceName="transactionItems" />;

  return (
    <Table columns="transactionTable">
      <Table.Header>
        <div></div>
        <div>کاتی هێنانەوە</div>
        <div>دەرەنجام</div>
        <div>وەسڵی هاتوو</div>
        <div>پارەی ڕۆشتوو</div>
        <div>ژمارەی وەصڵ</div>
        <div>تێبینی</div>
        <div>بەروار</div>
      </Table.Header>

      <Table.Body
        data={transactionItems}
        render={item => (
          <TransactionRow
            isAdmin={isAdmin}
            data={item}
            item={item}
            key={item.id}
            companyItem={companyItem}
            companyId={companyId}
          />
        )}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default TransactionTable;

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
