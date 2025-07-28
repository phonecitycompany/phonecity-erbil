import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { MdLocationOn } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { useEditLoanItem } from './useEditLoanItem';
import { useEditPartner } from './useEditPartner';
function EditPartnerForm({
  onCloseModal,
  partnerId,
  withdrawal,
  total,
  deposit,
  share,
  partnerName,
}) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { isEditing, editPartner } = useEditPartner();
  async function onFormSubmit(data) {
    if (!data.partnerName || !data.share) {
      return;
    }

    const newPartner = {
      Partner_name: data.partnerName,
      share: data.share / 100 || 0,
      deposit: data.deposit || 0,
      total: data.deposit - data.withdrawal || 0,
      withdrawal: data.withdrawal || 0,
    };
    editPartner({ newPartner, id: partnerId });
    if (!isEditing) {
      onCloseModal();
    }
  }

  return (
    <Form className="!p-1" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-row gap-6">
        <div className="">
          <div className="">
            <FormRowVertical error={errors?.partnerName?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="text"
                  id="partnerName"
                  autoComplete="partnerName"
                  defaultValue={partnerName}
                  {...register('partnerName', {
                    required: 'ناوی هاوبەش داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="partnerName"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  ناوی هاوبەش
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className=" mt-6">
            <FormRowVertical error={errors?.share?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  min={0}
                  id="share"
                  autoComplete="share"
                  defaultValue={share * 100}
                  {...register('share')}
                />
                <label
                  htmlFor="share"
                  className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                >
                  <FaPhoneFlip className="text-3xl text-main" />
                  <span>پشک لە ١٠٠</span>
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className=" mt-6">
            <FormRowVertical error={errors?.deposit?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  min={0}
                  id="deposit"
                  autoComplete="deposit"
                  defaultValue={deposit}
                  {...register('deposit')}
                />
                <label
                  htmlFor="deposit"
                  className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                >
                  <FaPhoneFlip className="text-3xl text-main" />
                  <span>پارەی زیادکراو</span>
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className=" mt-6">
            <FormRowVertical error={errors?.withdrawal?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  min={0}
                  id="withdrawal"
                  autoComplete="withdrawal"
                  defaultValue={withdrawal}
                  {...register('withdrawal')}
                />
                <label
                  htmlFor="withdrawal"
                  className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                >
                  <FaPhoneFlip className="text-3xl text-main" />
                  <span>پارەی ڕاکێشراو</span>
                </label>
              </div>
            </FormRowVertical>
          </div>
        </div>
      </div>
      <div className="rtl mt-4 flex  gap-5">
        <Button className="mt-6" type="submit" variation="confirm" size="large">
          {!false ? 'تۆمارکردن' : <SpinnerMini />}
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

export default EditPartnerForm;
