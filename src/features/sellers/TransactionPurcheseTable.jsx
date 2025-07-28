import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import TransactionRow from './TransactionRow';
import Empty from '../../ui/Empty';
import TransactionPurcheseRow from './TransactionPurcheseRow';

function TransactionPurcheseTable({
  transactionPurchese,
  purcheseLoading,
  purcheseCount,
}) {
  if (purcheseLoading) return <Spinner />;

  if (!transactionPurchese?.length)
    return <Empty resourceName="transactionPurchese" />;

  return (
    <Table columns="grid-cols-4 ">
      <Table.Header>
        <div className="text-no min-w-full "> کۆی نرخی کاڵا</div>
        <div> نرخی کاڵا</div>
        <div>بڕ</div>
        <div>ناوی کاڵا</div>
      </Table.Header>

      <Table.Body
        data={transactionPurchese}
        render={transactionPurchese => (
          <TransactionPurcheseRow
            data={transactionPurchese}
            item={transactionPurchese}
            key={transactionPurchese?.id}
          />
        )}
      />

      <Table.Footer>
        <Pagination count={purcheseCount} filterBy="children_page" />
      </Table.Footer>
    </Table>
  );
}

export default TransactionPurcheseTable;
