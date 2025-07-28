import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { MdLocationOn } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useAddtransactionLoan } from './useAddTransactionLoan';
import { da } from 'date-fns/locale';
function GetMoneyBack({ onCloseModal, debtorId }) {
  const { register, handleSubmit, formState } = useForm();
  const { isAdding, addTransaction } = useAddtransactionLoan();
  const { errors } = formState;
  async function onFormSubmit(data) {
    if (!data.outgoing_purchase && !data.return_date) {
      return;
    }
    const utcTime = new Date(data.return_date).toISOString();
    const newTransaction = {
      ingoing_purchase: 0,
      transaction_date: utcTime,
      outgoing_purchase: data.outgoing_purchase || 0,
      returning_date: data.return_date,
      note: data.note || null,
      debtor_id: debtorId,
      total_purchase: data.outgoing_purchase * -1 || 0,
      returning_date_reminder: data.return_date,
    };

    addTransaction(newTransaction);
    if (!isAdding) {
      onCloseModal();
    }
  }

  return (
    <Form className="!p-1" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-row gap-6">
        <div className="">
          <div className="">
            <FormRowVertical error={errors?.return_date?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="datetime-local"
                  id="return_date"
                  autoComplete="return_date"
                  {...register('return_date', {
                    required: 'بەروار داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="return_date"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  بەرواری گەڕاندنەوە
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className="">
            <FormRowVertical error={errors?.outgoing_purchase?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="number"
                  min={0}
                  id="outgoing_purchase"
                  autoComplete="outgoing_purchase"
                  {...register('outgoing_purchase', {
                    required: 'بڕی پارەی گەڕێندراوە داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="outgoing_purchase"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  بڕی پارەی گەڕێندراوە
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className="">
            <FormRowVertical className="!h-full" error={errors?.note?.message}>
              <div className="input rtl flex h-full flex-col justify-between">
                <label
                  htmlFor="note"
                  className="mt-2 flex cursor-pointer flex-row items-center gap-3  text-gray-500"
                >
                  <span>تێبینی...</span>
                </label>
                <textarea
                  className="mt-4 h-full w-96 resize-none"
                  id="note"
                  autoComplete="note"
                  {...register('note')}
                />
              </div>
            </FormRowVertical>
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

      <FormRowVertical error={errors?.password?.message}></FormRowVertical>
    </Form>
  );
}

export default GetMoneyBack;