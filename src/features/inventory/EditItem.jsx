import Button from '../../ui/Button';
// import Heading from '../../ui/Heading';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useAddPhone';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';
import { useState } from 'react';
import { set } from 'date-fns';
// import { useState } from 'react';

function EditItem({
  resourceName,
  disabled,
  onCloseModal,
  itemId,
  item_quantity,
  item_price,
  total_sell,
  editInventoryItem,
}) {
  const { register, handleSubmit, formState } = useForm();
  const { isAdding, addPhone } = useCreateCabin();
  const { errors } = formState;
  const [defaultValueForTotalSell, setDefaultValueForTotalSell] =
    useState(item_quantity);
  async function onFormSubmitEdited(data) {
    if (
      !data.itemNameForEdited ||
      !data.itemQuantityForEdited ||
      !data.itemPriceForEdited
    ) {
      return;
    }
    editInventoryItem({
      newPhone: {
        item_name: data.itemNameForEdited,
        total_sell:
          Number(
            data.totalSellForEdited &&
              data.totalSellForEdited !== '' &&
              data.totalSellForEdited !== undefined &&
              data.totalSellForEdited !== null
              ? data.totalSellForEdited
              : 0,
          ) + Number(total_sell),
        item_price: Number(data.itemPriceForEdited),
        item_quantity:
          Number(data.itemQuantityForEdited) -
          Number(
            data.totalSellForEdited &&
              data.totalSellForEdited !== '' &&
              data.totalSellForEdited !== undefined &&
              data.totalSellForEdited !== null
              ? data.totalSellForEdited
              : 0,
          ),
        total_price:
          Number(data.itemPriceForEdited) *
          (Number(data.itemQuantityForEdited) -
            Number(
              data.totalSellForEdited &&
                data.totalSellForEdited !== '' &&
                data.totalSellForEdited !== undefined &&
                data.totalSellForEdited !== null
                ? data.totalSellForEdited
                : 0,
            )),
      },
      id: itemId,
    });
    if (!isAdding) {
      onCloseModal();
    }
  }
  return (
    <Form onSubmit={handleSubmit(onFormSubmitEdited)}>
      <div className=" mt-6">
        <FormRowVertical error={errors?.itemNameForEdited?.message}>
          <div className="input ltr flex flex-row justify-between">
            <input
              className="w-96"
              type="text"
              id="itemNameForEdited"
              defaultValue={resourceName}
              autoComplete="itemNameForEdited"
              {...register('itemNameForEdited', {
                required: 'ناوی کاڵا داغڵ بکە',
              })}
            />
            <label
              htmlFor="itemNameForEdited"
              className="mt-2 cursor-pointer text-gray-500"
            >
              ناوی کاڵا
            </label>
          </div>
        </FormRowVertical>
      </div>
      <div className=" mt-6">
        <FormRowVertical error={errors?.itemQuantityForEdited?.message}>
          <div className="input ltr flex flex-row justify-between">
            <input
              className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              min={0}
              id="itemQuantityForEdited"
              defaultValue={item_quantity}
              autoComplete="itemQuantityForEdited"
              {...register('itemQuantityForEdited', {
                required: 'بڕی کاڵا داغڵ بکە',
              })}
              onChange={e => {
                setDefaultValueForTotalSell(e.target.value);
              }}
            />
            <label
              htmlFor="itemQuantityForEdited"
              className="mt-2 cursor-pointer text-gray-500"
            >
              بڕی کاڵا
            </label>
          </div>
        </FormRowVertical>
      </div>
      <div className=" mt-6 ">
        <FormRowVertical error={errors?.itemPriceForEdited?.message}>
          <div className="input ltr flex flex-row justify-between">
            <input
              className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              min={0}
              id="itemPriceForEdited"
              step="any"
              defaultValue={item_price}
              autoComplete="itemPriceForEdited"
              {...register('itemPriceForEdited', {
                required: 'نرخی کاڵا داغڵ بکە',
              })}
            />
            <label
              htmlFor="itemPriceForEdited"
              className="mt-2 cursor-pointer text-gray-500"
            >
              نرخی کاڵا
            </label>
          </div>
        </FormRowVertical>
      </div>
      <div className="mt-6">
        <FormRowVertical error={errors?.totalSellForEdited?.message}>
          <div className="input ltr flex flex-row justify-between">
            <input
              className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              min={0}
              id="totalSellForEdited"
              autoComplete="totalSellForEdited"
              {...register('totalSellForEdited', {
                max: {
                  value: Number(defaultValueForTotalSell),
                  message:
                    'بڕی کاڵای فرۆشتراو نابێت زیاتربێت لە کۆی کاڵا لە کۆگا',
                },
              })}
            />
            <label
              htmlFor="totalSellForEdited"
              className="mt-2 cursor-pointer text-gray-500"
            >
              بڕی کاڵای فرۆشراو
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
        <Button
          className="mt-6"
          disabled={disabled}
          type="submit"
          variation="confirm"
          size="large"
        >
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

export default EditItem;
