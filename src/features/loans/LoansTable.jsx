// import BookingRow from './BookingRow';

import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';
import LoansRow from './LoansRow';
import de from 'date-fns/esm/locale/de/index.js';
function LoansTable({ loansItem, isLoading, count }) {
  if (isLoading) return <Spinner />;

  if (!loansItem.length) return <Empty resourceName="loans Item" />;

  // console.log(loansItem);
  return (
    <Table columns="grid-cols-3">
      <Table.Header>
        <div>بڕی پارە بە درهەم</div>
        <div>بڕی پارە بە دۆلار</div>
        <div>ناوی شەریکە</div>
      </Table.Header>

      <Table.Body
        data={loansItem}
        render={item => (
          <LoansRow
            data={item}
            item={item}
            key={item.id ? item.id : item.sid}
          />
        )}
      />

      <Table.Footer>
        <Pagination count={count ? count : loansItem[0].group_count} />
      </Table.Footer>
    </Table>
  );
}

export default LoansTable;
