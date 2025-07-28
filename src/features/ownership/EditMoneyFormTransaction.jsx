import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useEditTransaction } from './useEditTransactions';
import { MdLocationOn } from 'react-icons/md';
function EditMoneyFormTransaction({
  onCloseModal,
  partnerId,
  transactionItamId,
  transaction_date,
  deposit,
  withdrawal,
  note,
}) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { isEditing, editTransactionItem } = useEditTransaction();
  const defaultValues = {
    transaction_date,
    deposit,
    withdrawal,
    note,
  };
  async function onFormSubmit(data) {
    if (!data.deposit && !data.transaction_date && !data.withdrawal) {
      return;
    }

    const newTransaction = {
      deposit: data.deposit,
      transaction_date: data.transaction_date,
      withdrawal: data.withdrawal,
      note: data.note || null,
      partner_id: partnerId,
      total: data.deposit - data.withdrawal,
    };

    editTransactionItem({ newTransaction, id: transactionItamId });
    // console.log(data)
    if (!isEditing) {
      onCloseModal();
    }
  }
  return (
    <Form className="!p-1" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-row gap-6">
        <div className="">
          <FormRowVertical className="!h-full" error={errors?.note?.message}>
            <div className="input rtl flex h-full flex-col justify-between">
              <label
                htmlFor="note"
                className="mt-2 flex cursor-pointer flex-row items-center gap-3  text-gray-500"
              >
                <MdLocationOn className="text-4xl text-main" />
                <span>تێبینی</span>
              </label>
              <textarea
                className="mt-4 h-full w-96 resize-none"
                type="text"
                id="note"
                defaultValue={defaultValues?.note}
                autoComplete="note"
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
                  type="date"
                  id="transaction_date"
                  autoComplete="transaction_date"
                  defaultValue={defaultValues?.transaction_date}
                  {...register('transaction_date', {
                    required: 'بەروار داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="transaction_date"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  بەروار
                </label>
              </div>
            </FormRowVertical>
          </div>

          <div className="">
            <FormRowVertical error={errors?.withdrawal?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="number"
                  id="withdrawal"
                  min={0}
                  autoComplete="withdrawal"
                  defaultValue={defaultValues?.withdrawal}
                  {...register('withdrawal', {
                    required: 'بڕی وەصڵی ڕۆشتوو داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="withdrawal"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  وەصڵی ڕۆشتوو
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
                  defaultValue={defaultValues?.deposit}
                  {...register('deposit', {
                    required: 'بڕی پارەی هاتوو داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="deposit"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  بڕی پارەی هاتوو
                </label>
              </div>
            </FormRowVertical>
          </div>
        </div>
      </div>
      <div className="rtl mt-4 flex  gap-5">
        <Button className="mt-6" type="submit" variation="confirm" size="large">
          {!isEditing ? 'تۆمارکردن' : <SpinnerMini />}
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

      <FormRowVertical error={errors?.password?.message}></FormRowVertical>
    </Form>
  );
}

export default EditMoneyFormTransaction;
