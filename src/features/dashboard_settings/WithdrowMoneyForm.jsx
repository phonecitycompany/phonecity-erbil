import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useAddVaultItem } from './useAddVaultItem';
// import { useAddtransactionLoan } from './useAddTransactionLoan';
function WithdrowMoneyForm({ onCloseModal }) {
  const { register, handleSubmit, formState } = useForm();
  // const { isAdding, addTransaction } = useAddtransactionLoan()
  const { isAdding, addVault } = useAddVaultItem();
  const { errors } = formState;
  async function onFormSubmit(data) {
    if (!data.withdrawal) {
      return;
    }

    const newVaultItem = {
      deposit: 0,
      withdrawal: data.withdrawal || 0,
      note: data.note || null,
      total: data.withdrawal * -1,
    };

    addVault(newVaultItem);
    if (!isAdding) {
      onCloseModal();
    }
  }

  return (
    <Form className="!p-1" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-row gap-6">
        <div className="">
          <div className="">
            <FormRowVertical
              label="بڕی پارەی دەرهێنراو لە سندووق بنووسە"
              error={errors?.withdrawal?.message}
            >
              <input
                className="input w-full"
                type="number"
                min={0}
                id="withdrawal"
                autoComplete="withdrawal"
                {...register('withdrawal', {
                  required: 'بڕی پارەی دەرهێنراو لە سندووق بنووسە',
                })}
              />
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

export default WithdrowMoneyForm;
