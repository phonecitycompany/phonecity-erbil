// import BookingRow from './BookingRow';

import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';
import VaultRow from './VaultRow';
function VaultTable({ transactionItems, isLoading, count, isAdmin }) {


    if (isLoading) return <Spinner />;

    if (!transactionItems?.length)
        return <Empty resourceName="Vault Item" />;

    return (
        <Table columns="grid-cols-5">
            <Table.Header>
                <div className=""></div>
                <div className="">تێبینی</div>
                <div className="">دەرهێنراو لە سنووق</div>
                <div className="">خستنە ناو سنووق</div>
                <div className="">بەروار</div>
            </Table.Header>

            <Table.Body
                data={transactionItems}
                render={item => (
                    <VaultRow isAdmin={isAdmin} data={item} item={item} key={item.id} />
                )}
            />

            <Table.Footer>
                <Pagination count={count} />
            </Table.Footer>
        </Table>
    );
}

export default VaultTable;


