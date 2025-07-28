import { TabHeaders, TabContent } from '../../ui/Tab';
import Row from '../../ui/Row';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import LoansTypeTab from './LoansTypeTab';
import AddLoans from './AddLoans';
import LoanList from './LoanList';
import { useLoanItems } from './useLoanItems';
import EditLoans from './EditLoans';
import { useLoanTransactionItems } from './useLoanTransactionitems';
import LoanTransactionTable from './LoanTransactionTable';
import LoanTotal from './LoanTotal';
import TransactionFilter from './TransactionFilter';
import { useUserforButtons } from '../authentication/useUserForButtons';
export default function LoansTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = searchParams.get('loan')
    ? searchParams.get('loan')
    : undefined;
  const loansTabType = [
    { value: 'givingLoans', label: 'قەرز دان' },
    { value: 'loans', label: 'قەرزەکان' },
  ];
  const { isLoading, count, loansItem } = useLoanItems();
  const {
    isLoading: loanLoading,
    count: loanCount,
    transactionItems,
    totalforfilter,
    totalforfilterloading,
  } = useLoanTransactionItems();
  const [loanId, setLoanId] = useState(searchParamsValue);
  const [currentTab, setCurrentTab] = useState(
    searchParams.get('tab') ? searchParams.get('tab') : 'loans',
  );
  const { isAdmin } = useUserforButtons();
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
  if (isLoading) return <Spinner />;

  if (loanLoading) return <Spinner />;

  return (
    <div className="">
      <TabHeaders
        tabs={loansTabType}
        onClickFunc={clearTheIdFromUrl}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <TabContent cuurentTab={currentTab}>
        <div className="" tabvalue="loans">
          <LoansTypeTab />
        </div>
        {/* oversea */}
        <div className="" tabvalue="givingLoans">
          <Row className=" mb-6 !gap-4 " type="horizontal">
            <div className=" flex flex-row flex-wrap gap-4">
              {isAdmin && <AddLoans />}

              {isAdmin && (
                <EditLoans
                  loansItem={loansItem}
                  loanId={loanId}
                  setLoanId={setLoanId}
                />
              )}

              <TransactionFilter />
            </div>

            <LoanList
              loansItem={loansItem}
              loanId={loanId}
              setLoanId={setLoanId}
            />
          </Row>
          <LoanTransactionTable
            transactionItems={transactionItems}
            isLoading={loanLoading}
            count={loanCount}
            isAdmin={isAdmin}
          />
          <LoanTotal
            loansItem={loansItem}
            loanId={loanId}
            transactionItems={transactionItems}
            isAdmin={isAdmin}
            totalforfilter={totalforfilter}
            totalforfilterloading={totalforfilterloading}
          />
        </div>
      </TabContent>
    </div>
  );
}
