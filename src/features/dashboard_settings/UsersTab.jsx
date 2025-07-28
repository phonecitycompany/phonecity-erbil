import { TabHeaders, TabContent } from '../../ui/Tab';
import Row from '../../ui/Row'
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { useGetUsersData } from './useGetUsersData';
import UsersTable from './UsersTable';
import AddCompany from './AddCompany';
import AddSeller from './AddSeller';
import AddLoans from './AddLoans';
import AddPartner from './AddPartner';
export default function UsersTab({ isAdmin }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const loansTypeOptions = [
        { value: 'partners', label: 'خاوان پشکەکان' },
        { value: 'loans', label: 'کەسانی تر' },
        { value: 'Local', label: 'کڕیاری ناوخۆ', },
        { value: 'Oversea', label: 'کڕیاری دەرەوە' },
        { value: 'company', label: 'شەریکات' },
    ];
    const { isLoading, count, users } = useGetUsersData();
    // const { isLoading, count, loansItem } = useGetLoans();
    // const { isLoading: isAllLoading, count: AllCount, loansItem: allLoanItems } = useGetAllLoans()
    // const { error, isCurrencyValueLoading, settings: { USDTOAED } = {} } = useSettings();
    const [currentTab, setCurrentTab] = useState(searchParams.get('childrenTab') ? searchParams.get('childrenTab') : 'company');
    // getSellerItems({ filter: sellerType });
    function clearTheIdFromUrl(value) {
        searchParams.delete('startDate');
        searchParams.delete('endDate');
        searchParams.delete('date');
        searchParams.delete('sortBy');
        searchParams.delete('seller');
        searchParams.set('childrenTab', value);
        setSearchParams(searchParams);

    }
    if (isLoading) return <Spinner />;


    return (
        <div className="">
            <TabHeaders
                tabs={loansTypeOptions}
                onClickFunc={clearTheIdFromUrl}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                activeTabClassName="!bg-sky-blue !rounded-b-xl"
                nonActiveTabClassName=""
            />

            <TabContent cuurentTab={currentTab}

            >
                <div className="" tabvalue="loans">
                    <UsersTable isAdmin={isAdmin} users={users} isLoading={isLoading} count={count} />
                    <div className=" flex flex-row justify-end gap-4 w-full mt-5">
                        {isAdmin && <AddLoans />}


                    </div>
                </div>
                <div className="" tabvalue="Local">
                    <UsersTable isAdmin={isAdmin} users={users} isLoading={isLoading} count={count} />
                    <div className=" flex flex-row justify-end gap-4 w-full mt-5">
                        {isAdmin && <AddSeller />}

                    </div>
                </div>
                {/* oversea */}
                <div className="" tabvalue="Oversea">
                    <UsersTable isAdmin={isAdmin} users={users} isLoading={isLoading} count={count} />
                    <div className=" flex flex-row justify-end gap-4 w-full mt-5">
                        {isAdmin && <AddSeller />}

                    </div>
                </div>
                <div className="" tabvalue="company">

                    <UsersTable isAdmin={isAdmin} users={users} isLoading={isLoading} count={count} />
                    <div className=" flex flex-row justify-end gap-4 w-full mt-5">
                        {isAdmin && <AddCompany />}

                    </div>
                </div>
                <div className="" tabvalue="partners">

                    <UsersTable isAdmin={isAdmin} users={users} isLoading={isLoading} count={count} />
                    <div className=" flex flex-row justify-end gap-4 w-full mt-5">
                        {isAdmin && <AddPartner />}

                    </div>
                </div>
            </TabContent>
        </div>
    );
}
