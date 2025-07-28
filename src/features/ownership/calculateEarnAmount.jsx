import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useAddTransaction } from './useAddTransaction';
import FromToDateFilter from '../../ui/FromToDateFilter';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetEarnData } from './useGetEarnData';
function CalculateEarnAmount({ partnersData, partnerId }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, loadingSecond, count, countSecond, newCombinedData } =
    useGetEarnData();
  // console.log(newCombinedData)

  if (isLoading || loadingSecond || !partnersData || !partnerId) {
    return;
  }

  return (
    <div className="w-[20rem]  rounded-xl bg-white !p-5 shadow-sm   lg:w-[25rem] ">
      <div className="mb-5 text-right text-2xl">بڕی قازانج</div>
      <FromToDateFilter
        startDateValue="capitalStartDate"
        endDateValue="capitalEndDate"
        className2={'h-16'}
        classForHeading="hidden"
      />

      <div className="mb-5 mt-4 text-right text-2xl">
        کۆی قازانج لەو ماوەیەی دیاریت کردوە
      </div>
      <div className="input h-16">
        {newCombinedData
          ? (Number(
              Math.round(newCombinedData?.capitalItemSecond[0]?.value) || 0,
            ) - Number(Math.round(newCombinedData?.capitalItem[0]?.value)) ||
              0) * partnersData?.find(partner => partner.id == partnerId)?.share
          : 0}
      </div>
      <div className="rtl flex  gap-5">
        <Button
          type="button"
          variation="confirm"
          onClick={() => {
            searchParams.delete('capitalEndDate');
            searchParams.delete('capitalStartDate');
            setSearchParams(searchParams);
          }}
          className="mt-6 bg-gray-200 text-gray-700"
        >
          نوێ کردنەوە
        </Button>
      </div>
    </div>
  );
}

export default CalculateEarnAmount;
