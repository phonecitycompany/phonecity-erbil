import SellerList from './SellerList';
import { TabHeaders, TabContent } from '../../ui/Tab';
import Row from '../../ui/Row';
import TransactionTable from './TransactionTable';
import AddSeller from './AddSeller';
import EditSeller from './EditSeller';
import { getSellerItems } from '../../services/apiSeller';
import TransactionFilter from './TransactionFilter';
import { useSellerItem } from './useSellerItem';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTransactionItems } from './useTransactionItems';
import TransactionTotal from './TransactionTotal';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import { useUserforButtons } from '../authentication/useUserForButtons';
export default function SellersTab() {
  const { sellerItem, isLoading, count } = useSellerItem();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = searchParams.get('seller')
    ? searchParams.get('seller')
    : undefined;

  const {
    transactionItems,
    isLoading: transactionLoading,
    count: transactionCount,
    totalforfilter,
    totalforfilterloading,
  } = useTransactionItems();

  const sellersTypeOptions = [
    { value: 'Local', label: 'کڕیاری ناوخۆ' },
    { value: 'Oversea', label: 'کڕیاری دەرەوە' },
  ];
  const { isAdmin } = useUserforButtons();
  const [sellerid, setSellerid] = useState(searchParamsValue);
  const [currentTab, setCurrentTab] = useState(
    searchParams.get('tab') ? searchParams.get('tab') : 'Local',
  );
  // getSellerItems({ filter: sellerType });
  function clearTheIdFromUrl(value) {
    setSellerid(undefined);
    searchParams.delete('startDate');
    searchParams.delete('endDate');
    searchParams.delete('date');
    searchParams.delete('sortBy');
    searchParams.delete('seller');
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  }
  if (isLoading) return <Spinner />;

  return (
    <div className="">
      <TabHeaders
        tabs={sellersTypeOptions}
        onClickFunc={clearTheIdFromUrl}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <TabContent cuurentTab={currentTab}>
        <div className="" tabvalue="Local">
          <Row className=" mb-6 !gap-4" type="horizontal">
            <div className=" flex flex-row flex-wrap gap-4">
              {isAdmin && <AddSeller />}
              {!isLoading && isAdmin && (
                <EditSeller
                  isLoading={isLoading}
                  arrayOfSellers={sellerItem}
                  sellerid={sellerid}
                />
              )}

              <TransactionFilter />
            </div>
            <SellerList
              sellerItem={sellerItem}
              isLoading={isLoading}
              count={count}
              sellerid={sellerid}
              setSellerid={setSellerid}
            />
          </Row>
          <TransactionTable
            isAdmin={isAdmin}
            transactionItems={transactionItems}
            isLoading={transactionLoading}
            count={transactionCount}
          />

          <TransactionTotal
            transactionItems={transactionItems}
            isLoading={transactionLoading}
            arrayOfSellers={sellerItem}
            sellerid={sellerid}
            totalforfilter={totalforfilter}
            totalforfilterloading={totalforfilterloading}
            accountTotal={
              sellerItem?.find(seller => seller.id == sellerid)?.total
            }
          />
        </div>
        {/* oversea */}
        <div className="" tabvalue="Oversea">
          <Row className=" mb-6 !gap-4" type="horizontal">
            <div className=" flex flex-row gap-4 ">
              {isAdmin && <AddSeller />}

              {!isLoading && isAdmin && (
                <EditSeller
                  isLoading={isLoading}
                  arrayOfSellers={sellerItem}
                  sellerid={sellerid}
                />
              )}

              <TransactionFilter />
            </div>
            <SellerList
              sellerItem={sellerItem}
              isLoading={isLoading}
              count={count}
              sellerid={sellerid}
              setSellerid={setSellerid}
            />
          </Row>
          <TransactionTable
            isAdmin={isAdmin}
            transactionItems={transactionItems}
            isLoading={transactionLoading}
            count={transactionCount}
          />

          <TransactionTotal
            transactionItems={transactionItems}
            isLoading={transactionLoading}
            arrayOfSellers={sellerItem}
            sellerid={sellerid}
            totalforfilter={totalforfilter}
            accountTotal={
              sellerItem?.find(seller => seller.id == sellerid)?.total
            }
          />
        </div>
      </TabContent>
    </div>
  );
}