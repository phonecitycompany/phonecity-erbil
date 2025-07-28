import Button from '../../ui/Button';
// import Heading from '../../ui/Heading';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';
// import { useEditTransaction } from './useEditTransaction';
import { useSearchParams } from 'react-router-dom';
import { useEditVaultItems } from './useEditVaultItems';
export default function EditVaultForm({
  deposit,
  withdrawal,
  onCloseModal,
  transactionItamId,
}) {
  // const { editTransactionItem, isEditting } = useEditTransaction();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, formState, setValue } = useForm();
  const { isEditing, editTransactionItem } = useEditVaultItems();
  const { errors } = formState;

  async function onFormSubmitEdited(data) {
    if (!data.deposit && !data.withdrawal) {
      return;
    }
    const newVaultItem = {
      deposit: data.deposit,
      withdrawal: data.withdrawal,
      total: data.deposit - data.withdrawal,
    };
    editTransactionItem({ newVaultItem, id: transactionItamId });
    if (!isEditing) {
      onCloseModal();
    }
  }

  return (
    <div className="">
      <Form className="!p-1" onSubmit={handleSubmit(onFormSubmitEdited)}>
        <div className="flex flex-row gap-6">
          <div className="">
            <div className=" ">
              <FormRowVertical error={errors?.deposit?.message}>
                <div className="input ltr flex flex-row justify-between">
                  <input
                    className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    min={0}
                    id="deposit"
                    defaultValue={deposit}
                    autoComplete="deposit"
                    {...register('deposit')}
                  />
                  <label
                    htmlFor="deposit"
                    className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                  >
                    <span>خستنە ناو سنووق</span>
                  </label>
                </div>
              </FormRowVertical>
              <div className=" mt-6 ">
                <FormRowVertical error={errors?.withdrawal?.message}>
                  <div className="input ltr flex flex-row justify-between">
                    <input
                      className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      min={0}
                      id="withdrawal"
                      defaultValue={withdrawal}
                      autoComplete="withdrawal"
                      {...register('withdrawal')}
                    />

                    <label
                      htmlFor="withdrawal"
                      className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                    >
                      <span>دەرهێنراو لە سنووق</span>
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
            onClick={onCloseModal}
            className="mt-6 bg-gray-200 text-gray-700"
          >
            پەشیمانبونەوە
          </Button>
          <Button
            className="mt-6"
            disabled={isEditing}
            type="submit"
            variation="confirm"
            size="large"
          >
            {!isEditing ? 'تۆمارکردن' : <SpinnerMini />}
          </Button>
        </div>
      </Form>
    </div>
  );
}
