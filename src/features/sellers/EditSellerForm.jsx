import Button from '../../ui/Button';
// import Heading from '../../ui/Heading';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useAddSeller';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';
import { useSellerItem } from './useSellerItem';
import Modal from '../../ui/Modal';
import { useEditSellerItem } from './useEditSellerItem';
// import { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function EditSellerForm({
  onCloseModal,
  isLoading,
  arrayOfSellers,
  sellerid,
}) {
  const { editSellerItem, isEditting } = useEditSellerItem();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, formState, setValue } = useForm();

  const { errors } = formState;
  const defaultValues = arrayOfSellers?.find(seller => seller.id == sellerid);
  async function onFormSubmitEdited(data) {
    if (!data.seller_name) {
      return;
    }
    editSellerItem({
      newSeller: {
        seller_name: data.seller_name,
        seller_email: data.seller_email || null,
        seller_location: data.seller_location || null,
        seller_phone_number: data.seller_phone_number || null,
        seller_website: data.seller_website || null,
      },
      id: sellerid,
    });
    if (!isEditting) {
      onCloseModal();
    }
  }

  if (!defaultValues) {
    return <div className="">No person Selected To Be Edited</div>;
  }
  return (
    <div className="">
      <Form className="!p-1" onSubmit={handleSubmit(onFormSubmitEdited)}>
        <div className="flex flex-row gap-6">
          <div className="">
            <FormRowVertical
              className="!h-full"
              error={errors?.seller_location?.message}
            >
              <div className="input rtl flex h-full flex-col justify-between">
                <label
                  htmlFor="seller_location"
                  className="mt-2 flex cursor-pointer flex-row items-center gap-3  text-gray-500"
                >
                  <MdLocationOn className="text-4xl text-main" />
                  <span>ناونیشانی كڕیار</span>
                </label>
                <textarea
                  className="mt-4 h-full w-96 resize-none"
                  type="text"
                  id="seller_location"
                  autoComplete="seller_location"
                  defaultValue={defaultValues?.seller_location}
                  {...register('seller_location')}
                />
              </div>
            </FormRowVertical>
          </div>
          <div className="">
            <div className="">
              <FormRowVertical error={errors?.seller_name?.message}>
                <div className="input ltr flex flex-row justify-between">
                  <input
                    className="w-96"
                    type="text"
                    id="seller_name"
                    defaultValue={defaultValues?.seller_name}
                    autoComplete="seller_name"
                    {...register('seller_name', {
                      required: 'ناوی كڕیار داغڵ بکە',
                    })}
                  />
                  <label
                    htmlFor="seller_name"
                    className="mt-2 cursor-pointer text-gray-500"
                  >
                    ناوی كڕیار
                  </label>
                </div>
              </FormRowVertical>
            </div>
            <div className=" mt-6">
              <FormRowVertical error={errors?.seller_phone_number?.message}>
                <div className="input ltr flex flex-row justify-between">
                  <input
                    className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    id="seller_phone_number"
                    autoComplete="seller_phone_number"
                    defaultValue={defaultValues?.seller_phone_number}
                    {...register('seller_phone_number')}
                  />
                  <label
                    htmlFor="seller_phone_number"
                    className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                  >
                    <FaPhoneFlip className="text-3xl text-main" />
                    <span>ژمارەی کڕیار</span>
                  </label>
                </div>
              </FormRowVertical>
            </div>
            <div className=" mt-6 ">
              <FormRowVertical error={errors?.seller_email?.message}>
                <div className="input ltr flex flex-row justify-between">
                  <input
                    className="w-96"
                    type="email"
                    id="seller_email"
                    autoComplete="seller_email"
                    defaultValue={defaultValues?.seller_email}
                    {...register('seller_email')}
                  />
                  <label
                    htmlFor="seller_email"
                    className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                  >
                    <MdEmail className="text-3xl text-main" />
                    <span>ئیمێڵی كڕیار</span>
                  </label>
                </div>
              </FormRowVertical>
              <div className=" mt-6 ">
                <FormRowVertical error={errors?.seller_website?.message}>
                  <div className="input ltr flex flex-row justify-between">
                    <input
                      className="w-96"
                      type="text"
                      id="seller_website"
                      autoComplete="seller_website"
                      defaultValue={defaultValues?.seller_website}
                      {...register('seller_website')}
                    />

                    <label
                      htmlFor="seller_website"
                      className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                    >
                      <TbWorld className="text-3xl text-main" />
                      <span>سایتی كڕیار</span>
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
            disabled={isLoading}
            onClick={onCloseModal}
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
            {!isLoading ? 'تۆمارکردن' : <SpinnerMini />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
