import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { MdLocationOn } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useCreateCabin } from './useAddSeller';

function AddSellerForm({ onCloseModal }) {
  const { register, handleSubmit, formState } = useForm();
  const [searchParams] = useSearchParams();

  const { errors } = formState;
  const { isAdding, addSeller } = useCreateCabin();
  async function onFormSubmit(data) {
    if (!data.seller_name) {
      return;
    }
    const sortByRaw = searchParams.get('childrenTab');

    const filter = !sortByRaw
      ? 'Local'
      : sortByRaw.trim() == 'Local'
      ? 'Local'
      : sortByRaw.trim() == 'Oversea'
      ? 'Oversea'
      : 'Local';
    const newSeller = {
      seller_name: data.seller_name,
      seller_email: data.seller_email || null,
      seller_location: data.seller_location || null,
      seller_phone_number: data.seller_phone_number || null,
      seller_website: data.seller_website || null,
      type: filter,
      incoming_invoice: 0,
      outgoing_invoice: 0,
      total: 0,
    };
    addSeller(newSeller);
    if (!isAdding) {
      onCloseModal();
    }
  }

  return (
    <Form className="!p-1" onSubmit={handleSubmit(onFormSubmit)}>
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
      <div className="rtl mt-4 flex  gap-5">
        <Button className="mt-6" type="submit" variation="confirm" size="large">
          {!isAdding ? 'تۆمارکردن' : <SpinnerMini />}
        </Button>
        <Button
          type="button"
          variation="confirm"
          disabled={false}
          onClick={onCloseModal}
          className="mt-6 bg-gray-200 text-gray-700"
        >
          پەشیمانبونەوە
        </Button>
      </div>
    </Form>
  );
}

export default AddSellerForm;
