import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';
import CompanyRow from './CompanyRow';
import SellerRow from './SellerRow';
import DebtorRow from './DebtorRow';
import PartnerRow from './PartnerRow';
function UsersTable({ users, isLoading, count, isAdmin }) {
    if (isLoading) return <Spinner />;

    if (!users?.length)
        return <Empty resourceName="Vault Item" />;

    return (
        <Table columns={'grid-cols-6'}>
            <Table.Header>
                <div ></div>
                <div >{users[0].Partner_name ? 'کۆی گشتی' : "ناونیشان"}</div>
                <div >{users[0].Partner_name ? 'زیادکراو' : "وێبسایت"}</div>
                <div >{users[0].Partner_name ? 'دەرهێنراو' : "ئیمەڵ"}</div>
                <div >{users[0].Partner_name ? 'پشک' : 'ژمارە تەلەفون'}</div>


                <div className="">{users[0].company_name ? 'ناوی کۆمپانیا' : users[0].seller_name ? "ناوی کڕیار" : users[0].debtor_name ? 'ناوی قەرزدار' : 'ناوی هاوبەش'}</div>
            </Table.Header>
            <Table.Body
                data={users}
                render={item => {
                    if (item.company_name) {
                        return <CompanyRow isAdmin={isAdmin} data={item} item={item} key={item.id} />;
                    } else if (item.seller_name) {
                        return <SellerRow isAdmin={isAdmin} data={item} item={item} key={item.id} />;
                    } else if (item.Partner_name) {
                        return <PartnerRow isAdmin={isAdmin} data={item} item={item} key={item.id} />;
                    } else if (item.debtor_name) {
                        return <DebtorRow isAdmin={isAdmin} data={item} item={item} key={item.id} />;
                    } else {
                        return null;
                    }
                }}
            />
            <Table.Footer>
                <Pagination count={count} />
            </Table.Footer>
        </Table>
    );
}

export default UsersTable;


