import { TabHeaders, TabContent } from '../../ui/Tab';
import Row from '../../ui/Row';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import EditAccountForm from './EditingAccountForm';
import EditPasswordform from './EditPasswordForm';
import AddingNewAccountForm from './AddingNewAccountForm';
import VaultTable from './VaultTable';
import { UseGetVaultItems } from './useGetVaultItems';
import VaultTotal from './VaultTotal';
import UsersTab from './UsersTab';
import { useUserforButtons } from '../authentication/useUserForButtons';

export default function SettingTab() {

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = searchParams.get('loan')
    ? searchParams.get('loan')
    : undefined;

  const { isLoading, count, transactionItems, allvaults } = UseGetVaultItems();
  const [loanId, setLoanId] = useState(searchParamsValue);
  const [currentTab, setCurrentTab] = useState(
    searchParams.get('tab') ? searchParams.get('tab') : 'myAccount',
  );
  // getSellerItems({ filter: sellerType });
  function clearTheIdFromUrl(value) {
    setLoanId(undefined);
    searchParams.delete('startDate');
    searchParams.delete('endDate');
    searchParams.delete('date');
    searchParams.delete('sortBy');
    searchParams.delete('loan');
    searchParams.delete('childrenTab');
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  }
  const { isAdmin } = useUserforButtons();

  // if (isLoading) return <Spinner />;

  // if (count == 0) return <Empty message="هیچ قەرزێک نییە" />
  const loansTabType = [
    { value: 'datas', label: 'داتاکان' },
    { value: 'accounts', label: 'هەژمارەکان' },
    { value: 'addingAccount', label: 'زیاد کردنی بەکارهێنەر' },
    { value: 'myAccount', label: 'هەژمارەکەم' },
  ];
  return (
    <div className="">
      <TabHeaders
        tabs={loansTabType}
        onClickFunc={clearTheIdFromUrl}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <TabContent cuurentTab={currentTab}>
        <div className="" tabvalue="myAccount">
          <EditAccountForm />
          <div className="my-10 h-0.5 w-full bg-black opacity-30"></div>
          <EditPasswordform />
        </div>

        <div className="" tabvalue="addingAccount">
          <AddingNewAccountForm isAdmin={isAdmin} />
        </div>
        <div className="" tabvalue="accounts">
          <UsersTab isAdmin={isAdmin} />
        </div>
        <div className="" tabvalue="datas">
          <h2 className="mb-5">پارەی ناو سندووق</h2>
          <VaultTable
            isAdmin={isAdmin}
            transactionItems={transactionItems}
            isLoading={isLoading}
            count={count}
          />
          <VaultTotal
            isAdmin={isAdmin}
            transactionItems={transactionItems}
            isLoading={isLoading}
            totalforfilter={allvaults}
          />
        </div>
      </TabContent>
    </div>
  );
}
