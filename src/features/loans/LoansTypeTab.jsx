import { TabHeaders, TabContent } from '../../ui/Tab';
import Row from '../../ui/Row';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import { useGetLoans } from './useGetLoans';
import LoansTable from './LoansTable';
import TransactionFilter from './TransactionFilter';
import Button from '../../ui/Button';
import LoanFilter from './LoanFilter';
import { useGetAllLoans } from './useGetAllLoans';
import { formatCurrency, newFormatCurrency } from '../../utils/helpers';
import useSettings from '../settings/useSettings';
import { IoIosCloseCircle } from 'react-icons/io';
import SingleInvoice from '../../pages/SingleInvoice';
export default function LoansTypeTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = searchParams.get('childrenTab')
    ? searchParams.get('childrenTab')
    : undefined;
  const loansTypeOptions = [
    { value: 'loans', label: 'کەسانی تر' },
    { value: 'Local', label: 'کڕیاری ناوخۆ' },
    { value: 'Oversea', label: 'کڕیاری دەرەوە' },
    { value: 'company', label: 'شەریکات' },
  ];
  const { isLoading, count, loansItem } = useGetLoans();

  const {
    isLoading: isAllLoading,
    count: AllCount,
    loansItem: allLoanItems,
  } = useGetAllLoans();

  const {
    error,
    isCurrencyValueLoading,
    settings: { USDTOAED } = {},
  } = useSettings();
  const [sellerid, setSellerid] = useState(searchParamsValue);
  const [currentTab, setCurrentTab] = useState(
    searchParams.get('childrenTab')
      ? searchParams.get('childrenTab')
      : 'company',
  );
  // getSellerItems({ filter: sellerType });
  function clearTheIdFromUrl(value) {
    setSellerid(undefined);
    searchParams.delete('startDate');
    searchParams.delete('endDate');
    searchParams.delete('date');
    searchParams.delete('sortBy');
    searchParams.delete('seller');
    searchParams.set('childrenTab', value);
    setSearchParams(searchParams);
  }

  const [showInvoice, setShowInvoice] = useState(false);
  const [lang, setLang] = useState(null);
  const [money, setMoney] = useState(null);
  const [langDrop, setLangDrop] = useState(false);
  const [moneyDrop, setMoneyDrop] = useState(false);
  const [langPlaceholder, setLangPlaceHolder] = useState('زمان هەڵبژێرە');
  const [moneyPlaceholder, setMoneyPlaceHolder] =
    useState('جۆری دراو هەڵبژێرە');

  return (
    <div className="">
      {showInvoice && (
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gray-100">
          <div className="rtl  p-7">
            <IoIosCloseCircle
              onClick={() => {
                setShowInvoice(false);
              }}
              className="cursor-pointer text-7xl text-main"
            />
          </div>
          <SingleInvoice
            type="alldebtinvo"
            data={loansItem}
            setLang={setLang}
            setMoney={setMoney}
            setShowInvoice={setShowInvoice}
          />
        </div>
      )}
      <TabHeaders
        tabs={loansTypeOptions}
        onClickFunc={clearTheIdFromUrl}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activeTabClassName="!bg-sky-blue !rounded-b-xl"
        nonActiveTabClassName=""
      />

      <TabContent cuurentTab={currentTab}>
        <div className="" tabvalue="loans">
          <div className="mb-5 flex items-center justify-between space-x-8">
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-sky-blue p-3">
              {allLoanItems && USDTOAED && (
                <div className="">
                  {newFormatCurrency(allLoanItems[0]?.total_value * USDTOAED)}
                </div>
              )}
              <div className="">کۆی قەرز بە درهەم</div>
            </div>
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-sky-blue p-3">
              {allLoanItems && (
                <div className="">
                  {formatCurrency(allLoanItems[0]?.total_value)}
                </div>
              )}
              <div className="">کۆی قەرز بە دۆلار</div>
            </div>
          </div>
          <LoansTable
            loansItem={loansItem}
            count={count}
            isLoading={isLoading}
          />
          <div className=" mt-5 flex w-full flex-row gap-4">
            <LoanFilter />
            <Button onClick={() => setShowInvoice(true)}>کەشف حساب</Button>
          </div>
        </div>
        <div className="" tabvalue="Local">
          <div className="mb-5 flex items-center justify-between space-x-8">
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-sky-blue p-3">
              {allLoanItems && USDTOAED && (
                <div className="">
                  {allLoanItems[0]?.total_value * USDTOAED}
                </div>
              )}
              <div className="">کۆی قەرز بە درهەم</div>
            </div>
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-sky-blue p-3">
              {allLoanItems && (
                <div className="">
                  {formatCurrency(allLoanItems[0]?.total_value)}
                </div>
              )}
              <div className="">کۆی قەرز بە دۆلار</div>
            </div>
          </div>
          <LoansTable
            loansItem={loansItem}
            count={count}
            isLoading={isLoading}
          />
          <div className=" mt-5 flex w-full flex-row gap-4">
            <LoanFilter />
            <Button onClick={() => setShowInvoice(true)}>کەشف حساب</Button>
          </div>
        </div>
        {/* oversea */}
        <div className="" tabvalue="Oversea">
          <div className="mb-5 flex items-center justify-between space-x-8">
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-sky-blue p-3">
              {allLoanItems && USDTOAED && (
                <div className="">
                  {allLoanItems[0]?.total_value * USDTOAED}
                </div>
              )}
              <div className="">کۆی قەرز بە درهەم</div>
            </div>
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-sky-blue p-3">
              {allLoanItems && (
                <div className="">
                  {formatCurrency(allLoanItems[0]?.total_value)}
                </div>
              )}
              <div className="">کۆی قەرز بە دۆلار</div>
            </div>
          </div>
          <LoansTable
            loansItem={loansItem}
            count={count}
            isLoading={isLoading}
          />
          <div className=" mt-5 flex w-full flex-row gap-4">
            <LoanFilter />
            <Button onClick={() => setShowInvoice(true)}>کەشف حساب</Button>
          </div>
        </div>
        <div className="" tabvalue="company">
          <div className="mb-5 flex items-center justify-between space-x-8">
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-sky-blue p-3">
              {allLoanItems && USDTOAED && (
                <div className="">
                  {allLoanItems[0]?.total_value * USDTOAED}
                </div>
              )}
              <div className="">کۆی قەرز بە درهەم</div>
            </div>
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-sky-blue p-3">
              {allLoanItems && (
                <div className="">
                  {formatCurrency(allLoanItems[0]?.total_value)}
                </div>
              )}
              <div className="">کۆی قەرز بە دۆلار</div>
            </div>
          </div>
          <LoansTable
            loansItem={loansItem}
            count={count}
            isLoading={isLoading}
          />
          <div className=" mt-5 flex w-full flex-row gap-4">
            <LoanFilter />
            <Button onClick={() => setShowInvoice(true)}>کەشف حساب</Button>
          </div>
        </div>
      </TabContent>
    </div>
  );
}