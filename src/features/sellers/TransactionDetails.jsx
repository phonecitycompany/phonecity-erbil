import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import TransactionPurcheseTable from './TransactionPurcheseTable';
import Button from '../../ui/Button';
import moment from 'moment';
export default function TransactionDetails({
  transactionPurchese,
  purcheseLoading,
  purcheseCount,
  transaction_date,
  total_purchase,
  note,
  inventory_receipt,
  sellers,
  onCloseModal,
}) {
  return (
    <div>
      <div className="rtl flex flex-row gap-5">
        <div className="flex flex-1 flex-col gap-3">
          <div className="rtl flex flex-col flex-wrap gap-x-10 gap-y-3">
            <div className="flex-shrink-0">
              ناوی كڕیار : {sellers?.seller_name}
            </div>
            <div className="flex-shrink-0">
              ژمارەی وەصڵ : {inventory_receipt}
            </div>
          </div>
          <div className="rtl flex flex-col flex-wrap gap-x-10 gap-y-3">
            <div className="flex-shrink-0">
              بەروار :{moment(transaction_date).format('lll')}
            </div>
            <div>کۆی گشتی پارە : {formatCurrency(total_purchase)} </div>
          </div>
        </div>
        <div className="my-auto h-36 w-1 bg-slate-300 lg:mx-2"></div>
        <div className="flex w-[280px] flex-1 flex-col">
          <p className="">تێبینی : </p>
          <p className="">{note}</p>
        </div>
      </div>
      <div className="mt-6">
        <TransactionPurcheseTable
          transactionPurchese={transactionPurchese}
          purcheseLoading={purcheseLoading}
          purcheseCount={purcheseCount}
        />
      </div>
      <div className="mt-10 flex justify-end">
        <Button
          variation="confirm"
          onClick={onCloseModal}
          className="bg-gray-200 text-gray-700"
        >
          پەشیمانبونەوە
        </Button>
      </div>
    </div>
  );
}