import { useForm } from 'react-hook-form';

import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useCreateCabin } from './useAddPhone';
function AddEditPhoneForm({ onCloseModal }) {
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;
  const { isAdding, addPhone } = useCreateCabin();
  async function onFormSubmit(data) {
    if (!data.itemName || !data.itemQuantity || !data.itemPrice) {
      return;
    }
    addPhone({
      item_name: data.itemName,
      total_sell: 0,
      item_price: data.itemPrice,
      item_quantity: data.itemQuantity,
      total_price: data.itemPrice * data.itemQuantity,
    });
    if (!isAdding) {
      onCloseModal();
    }
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <div className=" mt-6">
        <FormRowVertical error={errors?.itemName?.message}>
          <div className="input ltr flex flex-row justify-between">
            <input
              className="w-96"
              type="text"
              id="itemName"
              autoComplete="itemName"
              {...register('itemName', {
                required: 'ناوی کاڵا داغڵ بکە',
              })}
            />
            <label
              htmlFor="itemName"
              className="mt-2 cursor-pointer text-gray-500"
            >
              ناوی کاڵا
            </label>
          </div>
        </FormRowVertical>
      </div>
      <div className=" mt-6">
        <FormRowVertical error={errors?.itemQuantity?.message}>
          <div className="input ltr flex flex-row justify-between">
            <input
              className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              min={0}
              id="itemQuantity"
              autoComplete="itemQuantity"
              {...register('itemQuantity', {
                required: 'بڕی کاڵا داغڵ بکە',
              })}
            />
            <label
              htmlFor="itemQuantity"
              className="mt-2 cursor-pointer text-gray-500"
            >
              بڕی کاڵا
            </label>
          </div>
        </FormRowVertical>
      </div>
      <div className=" mt-6 ">
        <FormRowVertical error={errors?.itemPrice?.message}>
          <div className="input ltr flex flex-row justify-between">
            <input
              className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              step="any"
              min={0}
              id="itemPrice"
              autoComplete="itemPrice"
              {...register('itemPrice', {
                required: 'نرخی کاڵا داغڵ بکە',
              })}
            />
            <label
              htmlFor="itemPrice"
              className="mt-2 cursor-pointer text-gray-500"
            >
              نرخی کاڵا
            </label>
          </div>
        </FormRowVertical>
      </div>
      <div className="mt-8 flex justify-center gap-5">
        <Button
          type="button"
          variation="confirm"
          disabled={false}
          onClick={onCloseModal}
          className="mt-6 bg-gray-200 text-gray-700"
        >
          پەشیمانبونەوە
        </Button>
        <Button className="mt-6" type="submit" variation="confirm" size="large">
          {!isAdding ? 'تۆمارکردن' : <SpinnerMini />}
        </Button>
      </div>
      {/* <input
          className="input w-96"
          disabled={false}
          type="text"
          id="email"
          defaultValue={'mohammadsalih.main@gmail.com'}
          autoComplete="username"
          {...register('email', {
            required: 'ئیمەیڵ داغڵ بکە',
          })}
        /> */}
    </Form>
  );
}

export default AddEditPhoneForm;
