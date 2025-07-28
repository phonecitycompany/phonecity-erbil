import CompanyList from './CompanyList';
import { TabHeaders, TabContent } from '../../ui/Tab';
import Row from '../../ui/Row';
import TransactionTable from './TransactionTable';
import EditCompany from './EditCompany';
import TransactionFilter from './TransactionFilter';
import { useCompanyItem } from './useCompanyItem';
import { useState, useEffect } from 'react';
import { useCompanyTransactionItems } from './useCompanyTransactionItems';
import TransactionTotal from './TransactionTotal';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import AddCompany from './AddCompany';
import { useSearchParams } from 'react-router-dom';
import { useUserforButtons } from '../authentication/useUserForButtons';
export default function CompanyTab() {
  const { companyItem, isLoading, count } = useCompanyItem();
  const {
    transactionItems,
    isLoading: transactionLoading,
    count: transactionCount,
    totalforfilter,
    totalforfilterloading,
  } = useCompanyTransactionItems();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = searchParams.get('company')
    ? searchParams.get('company')
    : undefined;
  const [companyId, setCompanyId] = useState(searchParamsValue);
  const { isAdmin } = useUserforButtons();

  // getSellerItems({ filter: sellerType });

  if (isLoading) return <Spinner />;

  return (
    <div className="">
      <div className="flex w-full justify-end">
        <div className="flex w-1/2 items-center justify-center rounded-t-xl bg-white py-5 text-4xl">
          <span className="">شەریکات</span>
        </div>
      </div>

      <div className="h-full w-full bg-white px-5 pb-5 pt-8">
        <Row className=" mb-6 !gap-4" type="horizontal">
          <div className=" flex flex-row flex-wrap gap-4">
            {isAdmin && <AddCompany />}

            {!isLoading && isAdmin && (
              <EditCompany
                isLoading={isLoading}
                arrayOfCompanies={companyItem}
                companyId={companyId}
              />
            )}

            <TransactionFilter />
          </div>
          <CompanyList
            companyItem={companyItem}
            isLoading={isLoading}
            count={count}
            companyId={companyId}
            setCompanyId={setCompanyId}
          />
        </Row>
        <TransactionTable
          isAdmin={isAdmin}
          companyItem={companyItem}
          companyId={companyId}
          transactionItems={transactionItems}
          isLoading={transactionLoading}
          count={transactionCount}
        />

        <TransactionTotal
          arrayOfCompanies={companyItem}
          companyId={companyId}
          transactionItems={transactionItems}
          isLoading={transactionLoading}
          totalforfilter={totalforfilter}
          totalforfilterloading={totalforfilterloading}
          accountTotal={
            companyItem?.find(company => company.id == companyId)?.total
          }
        />
      </div>
    </div>
  );
}