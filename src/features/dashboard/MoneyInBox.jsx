import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { UseGetVaultItems } from '../dashboard_settings/useGetVaultItems';
import { useGetPartners } from '../ownership/useGetPartners';

export default function MoneyInBox({ className }) {
  const { isLoading, count, transactionItems, allvaults } = UseGetVaultItems();
  const { partnersData } = useGetPartners();
  const totalForshow = allvaults?.reduce(
    (total, item) => total + item.total,
    0,
  );
  return (
    <div
      className={` rtl flex flex-row items-center justify-between gap-4  rounded-xl bg-white p-4 ${className}`}
    >
      <div className="flex flex-col justify-between gap-6">
        <p className="text-2xl 2xl:text-3xl">پارەی ناو سندوق</p>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-black xl:text-4xl">
            {formatCurrency(
              totalForshow +
                partnersData?.reduce((accumulator, current) => {
                  return (accumulator += current?.total);
                }, 0),
            )}
          </p>
          {/* <p className='text-base xl:text-xl text-green-600'>100%</p> */}
        </div>
      </div>
      {/* <div className='w-40 h-32'>
                <img src="/images/upperdata.png" alt="loan" className='w-full h-full' />
            </div> */}
    </div>
  );
}
