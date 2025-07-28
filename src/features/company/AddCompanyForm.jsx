import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { MdLocationOn } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { useAddCompany } from './useAddCompany';
function AddCompanyForm({ onCloseModal }) {
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;
  const { isAdding, addCompany } = useAddCompany();
  async function onFormSubmit(data) {
    if (!data.company_name) {
      return;
    }
    addCompany({
      company_name: data.company_name,
      company_email: data.company_email || null,
      company_location: data.company_location || null,
      company_phone_number: data.company_phone_number || null,
      company_website: data.company_website || null,
    });
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
            error={errors?.company_location?.message}
          >
            <div className="input rtl flex h-full flex-col justify-between">
              <label
                htmlFor="company_location"
                className="mt-2 flex cursor-pointer flex-row items-center gap-3  text-gray-500"
              >
                <MdLocationOn className="text-4xl text-main" />
                <span>ناونیشانی شەریکە</span>
              </label>
              <textarea
                className="mt-4 h-full w-96 resize-none"
                type="text"
                id="company_location"
                autoComplete="company_location"
                {...register('company_location')}
              />
            </div>
          </FormRowVertical>
        </div>
        <div className="">
          <div className="">
            <FormRowVertical error={errors?.company_name?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="text"
                  id="company_name"
                  autoComplete="company_name"
                  {...register('company_name', {
                    required: 'ناوی شەریکە داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="company_name"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  ناوی شەریکە
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className=" mt-6">
            <FormRowVertical error={errors?.company_phone_number?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  id="company_phone_number"
                  autoComplete="company_phone_number"
                  {...register('company_phone_number')}
                />
                <label
                  htmlFor="company_phone_number"
                  className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                >
                  <FaPhoneFlip className="text-3xl text-main" />
                  <span>ژمارەی شەریکە</span>
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className=" mt-6 ">
            <FormRowVertical error={errors?.company_email?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="email"
                  id="company_email"
                  autoComplete="company_email"
                  {...register('company_email')}
                />
                <label
                  htmlFor="company_email"
                  className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                >
                  <MdEmail className="text-3xl text-main" />
                  <span>ئیمێڵی شەریکە</span>
                </label>
              </div>
            </FormRowVertical>
            <div className=" mt-6 ">
              <FormRowVertical error={errors?.company_website?.message}>
                <div className="input ltr flex flex-row justify-between">
                  <input
                    className="w-96"
                    type="text"
                    id="company_website"
                    autoComplete="company_website"
                    {...register('company_website')}
                  />

                  <label
                    htmlFor="company_website"
                    className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                  >
                    <TbWorld className="text-3xl text-main" />
                    <span>سایتی شەریکە</span>
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

export default AddCompanyForm;
