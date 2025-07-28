import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { useGetAllDebtorTransaction } from './useAllDebtorTransactions';
export default function AllLoansCombined({ className }) {
  const {
    allLoans,
    isLoading: isLoanLoad,
    count: LoanCount,
  } = useGetAllDebtorTransaction();

  return (
    <div className={`${className} rounded-xl bg-white `}>
      <div className="flex min-w-fit  flex-col items-center  justify-between gap-8">
        <p className="text-2xl text-[#A4AAB8] 2xl:text-3xl">کۆی قەرزی دەستی</p>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-black lg:text-4xl ">
            {formatCurrency(
              allLoans?.reduce(
                (sum, item) =>
                  sum + (item.ingoing_purchase - item.outgoing_purchase),
                0,
              ) || 0,
            )}
          </p>
          {/* <p className='text-base xl:text-xl  text-green-600'>100%</p> */}
        </div>
        <FaMoneyBillTransfer className="text-5xl text-main" />
      </div>
      {/* <div className='w-40 h-321'>
                <img src="/images/upperdata.png" alt="loan" className='w-full h-full' />
            </div> */}
    </div>
  );
}
