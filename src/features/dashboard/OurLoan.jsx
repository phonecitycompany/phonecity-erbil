import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useAllSellerTransaction } from '../dashboard/useAllSellerTransaction';

export default function OurLoan({ className }) {
  const { allsellerTransacrtion, isLoading, count } = useAllSellerTransaction();

  return (
    <div
      className={`${className} rtl flex flex-row items-center justify-between gap-4  rounded-xl bg-white p-4`}
    >
      <div className="flex min-w-fit flex-col justify-between gap-6">
        <p className="text-2xl 2xl:text-3xl">قەرزی ئێمە لای کڕیار</p>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-black xl:text-4xl">
            {formatCurrency(
              allsellerTransacrtion?.reduce(
                (sum, item) =>
                  sum + (item.ingoing_purchase - item.outgoing_purchase),
                0,
              ),
            )}
          </p>
          {/* <p className='text-base xl:text-xl  text-green-600'>100%</p> */}
        </div>
      </div>
      {/* <div className='w-40 h-321'>
                <img src="/images/upperdata.png" alt="loan" className='w-full h-full' />
            </div> */}
    </div>
  );
}
