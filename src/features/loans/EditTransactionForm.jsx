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
import { useEditTransaction } from './useEditTransaction';
function EditTransactionForm({
  onCloseModal,
  transactionId,
  transaction_date,
  ingoing_purchase,
  outgoing_purchase,
}) {
  const { register, handleSubmit, formState } = useForm();
  const { isEditing, editTransactionItem } = useEditTransaction();
  const { errors } = formState;
  const defaultValues = {
    transaction_date,
    ingoing_purchase,
    outgoing_purchase,
  };

  async function onFormSubmit(data) {
    if (
      !data.ingoing_purchase &&
      !data.outgoing_purchase &&
      !data.transaction_date
    ) {
      return;
    }

    const newTransaction = {
      ingoing_purchase: data.ingoing_purchase,
      transaction_date: data.transaction_date || null,
      outgoing_purchase: data.outgoing_purchase || null,
      total_purchase: data.ingoing_purchase - data.outgoing_purchase,
    };

    editTransactionItem({ newTransaction, id: transactionId });
    if (!isEditing) {
      onCloseModal();
    }
  }
  if (!defaultValues) {
    return <div className="">no person selected to be edited</div>;
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
            <FormRowVertical error={errors?.ingoing_purchase?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96"
                  type="number"
                  min={0}
                  id="ingoing_purchase"
                  autoComplete="ingoing_purchase"
                  defaultValue={defaultValues?.ingoing_purchase}
                  {...register('ingoing_purchase', {
                    required: 'بڕی پارەی قەرز کراو داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="ingoing_purchase"
                  className="mt-2 cursor-pointer text-gray-500"
                >
                  بڕی پارەی قەرز کراو
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className=" mt-6">
            <FormRowVertical error={errors?.outgoing_purchase?.message}>
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  id="outgoing_purchase"
                  min={0}
                  autoComplete="outgoing_purchase"
                  defaultValue={defaultValues?.outgoing_purchase}
                  {...register('outgoing_purchase', {
                    required: 'بڕی پارەی گەڕێندراوە داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="outgoing_purchase"
                  className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                >
                  <FaPhoneFlip className="text-3xl text-main" />
                  <span>بڕی پارەی گەڕێندراوە</span>
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

export default EditTransactionForm;
