import CustomerLoan from '../features/dashboard/CustomerLoan';
import { IncomeChart } from '../features/dashboard/IncomeChart';
import MoneyInBox from '../features/dashboard/MoneyInBox';
import OurLoan from '../features/dashboard/OurLoan';
import { ProfitChart } from '../features/dashboard/ProfitChart';
import Header from '../ui/Header';
import { formatCurrency } from '../utils/helpers';
import { CgMoreR } from 'react-icons/cg';
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2';
import { useInventoryItems } from '../features/inventory/useInventoryItems';
import { useEffect, useState } from 'react';
import { useGetCapital } from '../features/ownership/useGetCapital';
import { useGetAllCapital } from '../features/dashboard/useGetAllCapital';
import { useAllpartner } from '../features/dashboard/useAllPartner';
import { UseGetVaultItems } from '../features/dashboard_settings/useGetVaultItems';
import { useAllSellerTransaction } from '../features/dashboard/useAllSellerTransaction';
import { useAllCompanyTransaction } from '../features/dashboard/useAllCompanyTransaction';
import { IoIosCloseCircle } from 'react-icons/io';
import SingleInvoice from './SingleInvoice';
import Button from '../ui/Button';
import AllLoansCombined from '../features/dashboard/AllLoansCombined';
import { useGetPartners } from '../features/ownership/useGetPartners';
import { useGetInventoryItems } from '../features/invoice/useGetInventoryItems';

function Dashboard() {
  const { inventoryItems, isLoading, count } = useGetInventoryItems();

  const {
    capitalData,
    count: capitalCount,
    isLoading: capitaIsLoading,
  } = useGetCapital();
  const {
    allCapital,
    count: allcapitalCount,
    isLoading: aacapitaIsLoading,
  } = useGetAllCapital();
  const {
    allpartner,
    isLoading: parntnerLoding,
    count: partnerCount,
  } = useAllpartner();

  const [totalInvoPrice, setTotalInvoPrice] = useState(0);
  const [totalPartnerPrice, setTotalPartnerPrice] = useState(0);

  const [todayMoney, setTodayMoney] = useState(0);
  const [yesterdayMoney, setYesterdayMoney] = useState(0);
  const [allMoney, setAllMoney] = useState(0);

  const {
    isLoading: isLoadingVault,
    count: countVault,
    transactionItems,
  } = UseGetVaultItems();

  const {
    allsellerTransacrtion,
    isLoading: isLoadingSell,
    count: countSell,
  } = useAllSellerTransaction();
  const {
    allCompany,
    isLoading: transactionLoading,
    count: transactionCount,
  } = useAllCompanyTransaction();

  const data = {
    inventory: inventoryItems?.reduce(
      (sum, item) => sum + (item?.total_price || 0),
      0,
    ),
    boxmoney: transactionItems?.reduce(
      (sum, item) => sum + (item.total || 0),
      0,
    ),
    ourloan: allsellerTransacrtion?.reduce(
      (sum, item) => sum + (item?.total_purchase || 0),
      0,
    ),
    customerloan: allCompany?.reduce(
      (sum, item) => sum + (item?.total_purchase || 0),
      0,
    ),
    todayMoney: todayMoney,
    yesterdayMoney: yesterdayMoney,
    allMoney: allMoney,
  };

  const [showInvoice, setShowInvoice] = useState(false);

  return (
    <>
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
            type="dashinvo"
            data={data}
            setShowInvoice={setShowInvoice}
          />
        </div>
      )}
      <Header title="پەڕەی سەرەکی" />
      <div className="flex flex-col gap-4 text-[#A4AAB8] lg:flex-row">
        <OurLoan className="w-full lg:w-1/3" />
        <CustomerLoan className="w-full lg:w-1/3" />
        <MoneyInBox className="w-full lg:w-1/3" />
      </div>
      <div className="flex flex-col gap-8 2xl:flex-row">
        {/* icome chart keshay haya error dadat hande kat */}
        <IncomeChart className="h-full w-full bg-amber-200 2xl:w-1/2" />
        <ProfitChart
          setTodayMoney={setTodayMoney}
          setYesterdayMoney={setYesterdayMoney}
          setAllMoney={setAllMoney}
          className="h-auto w-full bg-amber-200 2xl:w-1/2"
        />
      </div>

      <div className="rtl flex flex-row rounded-xl bg-white p-6">
        <div className="flex w-1/3 flex-col items-center gap-8">
          <h1 className="text-2xl text-[#A4AAB8]">نرخی کەلوپەلی ناو مەخزەن</h1>
          <p className="text-2xl font-black lg:text-4xl">
            {formatCurrency(
              inventoryItems?.reduce(
                (sum, item) => sum + (item?.total_price || 0),
                0,
              ),
            )}
          </p>
          <CgMoreR className="text-5xl text-main" />
        </div>
        <div className="flex w-1/3 flex-col items-center gap-8">
          <h1 className="text-2xl text-[#A4AAB8]">دەستمایە</h1>
          <p className="text-2xl font-black lg:text-4xl">
            {formatCurrency(capitalData?.value)}
          </p>
          <HiArrowUpOnSquare className="text-5xl text-main" />
        </div>
        {/* <div className="flex w-1/3 flex-col items-center gap-8">
          <h1 className="text-2xl text-[#A4AAB8]">
            دەستمایە دوای دەستکاریکردن
          </h1>
          <p className="text-2xl font-black lg:text-4xl">
            {formatCurrency(
              capitalData?.value +
                allpartner?.reduce((sum, item) => sum + (item?.total || 0), 0),
            )}
          </p>
          <HiArrowDownOnSquare className="text-5xl text-main" />
        </div> */}
        <AllLoansCombined className="w-1/3" />
      </div>
      <div className="rtl flex">
        <Button
          onClick={() => {
            setShowInvoice(true);
          }}
        >
          کەشف حساب
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
