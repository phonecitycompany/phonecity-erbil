import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useAllCompanyTransaction } from '../dashboard/useAllCompanyTransaction';

export default function CustomerLoan({ className }) {
  const {
    allCompany,
    isLoading: transactionLoading,
    count: transactionCount,
  } = useAllCompanyTransaction();

  return (
    <div
      className={`${className} rtl flex flex-row items-center justify-between gap-4  rounded-xl bg-white p-4`}
    >
      <div className="flex min-w-fit flex-col justify-between gap-6">
        <p className="text-2xl 2xl:text-3xl">قەرزی فرۆشیار لای ئێمە</p>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-black xl:text-4xl">
            {formatCurrency(
              allCompany?.reduce(
                (sum, item) =>
                  sum + (item?.ingoing_purchase - item?.outgoing_purchase || 0),
                0,
              ),
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
