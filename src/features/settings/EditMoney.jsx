import Button from '../../ui/Button';
// import Heading from '../../ui/Heading';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';

import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaEquals } from 'react-icons/fa';
import { useEditSetting } from './useEditSetting';
export default function EditMoney({ onCloseModal, exchangeRate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, formState, setValue } = useForm();
  const { isEditing, editSetting } = useEditSetting();
  const { errors } = formState;

  async function onFormSubmitEditMoney(data) {
    if (!data.aud_money) {
      return;
    }
    const newSetting = {
      USDTOAED: data.aud_money / 100,
    };
    editSetting(newSetting);
    if (!isEditing) {
      onCloseModal();
    }
  }
  return (
    <div className="">
      <h3 className="mb-5">دیاری کردنی درهەم بەرامبەر دۆلار</h3>
      <Form className="!p-1" onSubmit={handleSubmit(onFormSubmitEditMoney)}>
        <div className="flex items-center">
          <div className=" ">
            <FormRowVertical>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="text"
                  id="dollar_money"
                  defaultValue={'100$'}
                  readOnly={true}
                />
                <label
                  htmlFor="dollar_money"
                  className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                >
                  <span>دۆلار</span>
                </label>
              </div>
            </FormRowVertical>
          </div>

          <div className="mx-4 text-2xl">
            <FaEquals />
          </div>
          <div className="">
            <FormRowVertical error={errors?.aud_money?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="number"
                  min={0}
                  id="aud_money"
                  defaultValue={exchangeRate * 100}
                  autoComplete="aud_money"
                  {...register('aud_money', {
                    required: 'ناوی كڕیار داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="aud_money"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  درهەم
                </label>
              </div>
            </FormRowVertical>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-5">
          <Button
            type="button"
            variation="confirm"
            // disabled={isLoading}
            onClick={onCloseModal}
            className="mt-6 bg-gray-200 text-gray-700"
          >
            پەشیمانبونەوە
          </Button>
          <Button
            className="mt-6"
            // disabled={isEditting}
            type="submit"
            variation="confirm"
            size="large"
          >
            {true ? 'گۆڕین' : <SpinnerMini />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
