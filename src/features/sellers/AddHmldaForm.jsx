import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useAddSellerTransactionItem } from '../invoice/useAddSellerTransactionItem';

function AddHmulaForm({ onCloseModal, sellerId, lastItem }) {
  const { register, handleSubmit, formState } = useForm();
  const { isAdding, addTransaction } = useAddSellerTransactionItem();
  // const { isAdding, addTransaction } = useAddtransactionLoan()
  const { errors } = formState;
  async function onFormSubmit(data) {
    if (!data.ingoing_purchase || !data.transaction_date) {
      return;
    }
    addTransaction({
      outgoing_purchase: 0,
      transaction_date: data.transaction_date,
      note: data.note || null,
      returning_date: data.transaction_date,
      returning_date_reminder: data.transaction_date,
      total_purchase: data.ingoing_purchase,
      ingoing_purchase: data.ingoing_purchase,
      seller_id: sellerId,
      inventory_receipt: Number(lastItem[0]?.id ? lastItem[0]?.id : 1) + 1,
    });
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
                    required: 'بەرواری عمولە داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="transaction_date"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  بەرواری عمولە
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className="">
            <FormRowVertical error={errors?.ingoing_purchase?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="number"
                  min={0.0}
                  step="any"
                  id="ingoing_purchase"
                  autoComplete="ingoing_purchase"
                  {...register('ingoing_purchase', {
                    required: 'بڕی عمولە داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="ingoing_purchase"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  بڕی عمولە
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
    </Form>
  );
}

export default AddHmulaForm;
