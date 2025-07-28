// import BookingRow from './BookingRow';

import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';
import TransactionRow from './TransactionRow';
function TransactionTable({ transactionItems, isLoading, count, partnerId }) {
  if (isLoading) return <Spinner />;

  if (!transactionItems.length)
    return <Empty resourceName="partner transaction" />;

  return (
    <Table columns="grid-cols-5 ">
      <Table.Header>
        <div className=""></div>
        <div>پارەی هاتوو</div>
        <div>پارەی ڕۆشتوو</div>
        <div className="">تێبینی</div>
        <div className="">بەروار</div>
      </Table.Header>

      <Table.Body
        data={transactionItems}
        render={item => (
          <TransactionRow
            partnerId={partnerId}
            data={item}
            item={item}
            key={item.id}
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
