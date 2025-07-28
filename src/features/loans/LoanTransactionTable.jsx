// import BookingRow from './BookingRow';

import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';

import Empty from '../../ui/Empty';
import TransactionRow from './TransactionRow';
function LoanTransactionTable({ transactionItems, isLoading, count, isAdmin }) {


    if (isLoading) return <Spinner />;

    if (!transactionItems.length)
        return <Empty resourceName="Loan Transaction Items" />;

    return (
        <Table columns="grid-cols-6">
            <Table.Header>
                <div></div>
                <div>کاتی هێنانەوە</div>
                <div>تێبینی</div>
                <div>بڕی پارەی گەڕێندراوە</div>
                <div>بڕی پارەی قەرز</div>
                <div>بەروار</div>
            </Table.Header>

            <Table.Body
                data={transactionItems}

                render={item => (
                    <TransactionRow isAdmin={isAdmin} data={item} item={item} key={item.id} />
                )}
            />

            <Table.Footer>
                <Pagination count={count} />
            </Table.Footer>
        </Table>
    );
}

export default LoanTransactionTable;

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
