import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useAddTransaction } from './useAddTransaction';
function AddMoneyTransaction({ onCloseModal, partnerId }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { isAdding, addTransaction } = useAddTransaction();
  async function onFormSubmit(data) {
    if (!data.deposit && !data.transaction_date) {
      return;
    }

    const newTransaction = {
      deposit: data.deposit,
      transaction_date: data.transaction_date,
      withdrawal: 0,
      note: data.note || null,
      partner_id: partnerId,
      total: data.deposit,
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
            <FormRowVertical error={errors?.transaction_date?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="date"
                  id="transaction_date"
                  autoComplete="transaction_date"
                  {...register('transaction_date', {
                    required: 'بەروار داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="transaction_date"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  بەرواری هێنانەوەی پارە
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className="">
            <FormRowVertical error={errors?.deposit?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="number"
                  min={0}
                  id="deposit"
                  autoComplete="deposit"
                  {...register('deposit', {
                    required: 'بڕی پارەی گەڕێندراوە داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="deposit"
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
          onClick={onCloseModal}
          className="mt-6 bg-gray-200 text-gray-700"
        >
          پەشیمانبونەوە
        </Button>
      </div>
    </Form>
  );
}

export default AddMoneyTransaction;
