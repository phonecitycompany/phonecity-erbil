import Button from '../../ui/Button';
// import Heading from '../../ui/Heading';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useForm } from 'react-hook-form';
import { useAddCompany } from './useAddCompany';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';

import { useEditTransaction } from './useEditTransaction';
// import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function EditTransaction({
  disabled,
  transactionItamId,
  transaction_date,
  ingoing_purchase,
  outgoing_purchase,
  note,
  inventory_receipt,
  onCloseModal,
}) {
  const { editTransactionItem, isEditting } = useEditTransaction();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, formState, setValue } = useForm();

  const { errors } = formState;

  async function onFormSubmitEdited(data) {
    if (!data.inventory_receipt) {
      return;
    }
    editTransactionItem({
      newTransaction: {
        inventory_receipt: data.inventory_receipt,
        ingoing_purchase: data.ingoing_purchase || null,
        transaction_date: data.transaction_date || null,
        outgoing_purchase: data.outgoing_purchase || null,
        note: data.note || null,
        total_purchase: data.ingoing_purchase - data.outgoing_purchase,
      },
      id: transactionItamId,
    });
    if (!isEditting) {
      setValue('inventory_receipt', data?.inventory_receipt);
      setValue('outgoing_purchase', data?.outgoing_purchase);
      setValue('transaction_date', data?.transaction_date);
      setValue('ingoing_purchase', data?.ingoing_purchase);
      setValue('note', data?.note);
      onCloseModal();
    }
  }

  return (
    <div className="">
      <Form className="!p-1" onSubmit={handleSubmit(onFormSubmitEdited)}>
        <div className="flex flex-row gap-6">
          <div className="">
            <FormRowVertical className="!h-full" error={errors?.note?.message}>
              <div className="input rtl flex h-full flex-col justify-between">
                <label
                  htmlFor="note"
                  className="mt-2 flex cursor-pointer flex-row items-center gap-3  text-gray-500"
                >
                  <span>تێبینی</span>
                </label>
                <textarea
                  className="mt-4 h-full w-96 resize-none"
                  type="text"
                  id="note"
                  autoComplete="note"
                  defaultValue={note}
                  {...register('note')}
                />
              </div>
            </FormRowVertical>
          </div>
          <div className="">
            <div className="">
              <FormRowVertical error={errors?.transaction_date?.message}>
                <div className="input ltr flex flex-row justify-between">
                  <input
                    className="w-96"
                    type="text"
                    id="transaction_date"
                    defaultValue={transaction_date}
                    autoComplete="transaction_date"
                    {...register('transaction_date', {
                      required: 'بەرواری وەصڵ داغڵ بکە',
                    })}
                  />
                  <label
                    htmlFor="transaction_date"
                    className="mt-2 cursor-pointer text-gray-500"
                  >
                    بەرواری وەصڵ
                  </label>
                </div>
              </FormRowVertical>
            </div>
            <div className=" mt-6">
              <FormRowVertical error={errors?.inventory_receipt?.message}>
                <div className="input ltr flex flex-row justify-between">
                  <input
                    className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    min={0}
                    id="inventory_receipt"
                    autoComplete="inventory_receipt"
                    defaultValue={inventory_receipt}
                    {...register('inventory_receipt')}
                  />
                  <label
                    htmlFor="inventory_receipt"
                    className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                  >
                    <span>ژمارەی وەصڵ</span>
                  </label>
                </div>
              </FormRowVertical>
            </div>
            <div className=" mt-6 ">
              <FormRowVertical error={errors?.ingoing_purchase?.message}>
                <div className="input ltr flex flex-row justify-between">
                  <input
                    className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    min={0}
                    id="ingoing_purchase"
                    autoComplete="ingoing_purchase"
                    defaultValue={ingoing_purchase}
                    {...register('ingoing_purchase')}
                  />
                  <label
                    htmlFor="ingoing_purchase"
                    className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                  >
                    <span>وەصڵی ڕۆشتوو</span>
                  </label>
                </div>
              </FormRowVertical>
              <div className=" mt-6 ">
                <FormRowVertical error={errors?.outgoing_purchase?.message}>
                  <div className="input ltr flex flex-row justify-between">
                    <input
                      className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      min={0}
                      id="outgoing_purchase"
                      autoComplete="outgoing_purchase"
                      defaultValue={outgoing_purchase}
                      {...register('outgoing_purchase')}
                    />

                    <label
                      htmlFor="outgoing_purchase"
                      className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                    >
                      <span>پارەی هاتوو</span>
                    </label>
                  </div>
                </FormRowVertical>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-5">
          <Button
            type="button"
            variation="confirm"
            disabled={disabled}
            // onClick={onCloseModal}
            className="mt-6 bg-gray-200 text-gray-700"
          >
            پەشیمانبونەوە
          </Button>
          <Button
            className="mt-6"
            disabled={isEditting}
            type="submit"
            variation="confirm"
            size="large"
          >
            {!isEditting ? 'تۆمارکردن' : <SpinnerMini />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
