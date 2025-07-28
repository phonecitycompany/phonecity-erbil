import React from 'react';
import { IoIosArrowDropdownCircle, IoIosCloseCircle } from 'react-icons/io';
import SellerList from '../sellers/SellerList';
import { useState, useEffect } from 'react';
import { useSellerItem } from '../sellers/useSellerItem';
import { useSearchParams } from 'react-router-dom';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import ItemList from './ItemList';
import SingleInvoice from '../../pages/SingleInvoice';
import Modal from '../../ui/Modal';
import { useAddTransactionPurchease } from './useAddTransactionPurchease';
import { AddSellerTransaction } from '../../services/apiTransaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useUpdateInventoryItems } from './useUpdateArrayOfItems';
import { max, set } from 'date-fns';
import { formatCurrency } from '../../utils/helpers';
import { AddTransactionPurchease } from '../../services/apiTransactionPurchese';
import { useGetLastItem } from './useGetLastItem';
import { UpdateArrayOfItms } from '../../services/apiInventory';
import useSettings from '../settings/useSettings';
import { useGetInventoryItems } from './useGetInventoryItems';
import { useGetPersonTotal } from './useGetPersonTotal';
import moment from 'moment';
export default function SellInvoiceForm() {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    getValues,
    clearErrors,
    watch,
    setError,
  } = useForm();
  const { errors, isValid } = formState;
  const {
    inventoryItems,
    isLoading: SellerLoding,
    count: sellerCount,
  } = useGetInventoryItems();
  const { lastItem, lastItemLoading } = useGetLastItem();
  const { sellerItem, isLoading, count } = useSellerItem();
  const [setPersonsData, personData] = useState();
  const [sellerid, setSellerid] = useState();
  const [sellerName, setSellerName] = useState();
  const [itemid, setItemid] = useState();
  const [itemName, setItemName] = useState();
  const [accDrop, setAccDrop] = useState(false);
  const [nullValue, setNullValue] = useState(false);
  const [arrayOfItems, setArrayOfItems] = useState([]);
  const [transactionPurchese, setTransactionPurchese] = useState([]);
  const [langPlaceholder, setLangPlaceHolder] = useState('زمان هەڵبژێرە');
  const [moneyPlaceholder, setMoneyPlaceHolder] =
    useState('جۆری دراو هەڵبژێرە');
  const [accPlaceholder, setAccPlaceHolder] = useState('جۆری حساب');
  const [printData, setPrintData] = useState({});
  const [langDrop, setLangDrop] = useState(false);
  const [moneyDrop, setMoneyDrop] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const queryClient = useQueryClient();
  const { isLoading: userTotaoLoding, sellerData } = useGetPersonTotal();

  const {
    error,
    isLoading: isLoadingMoneyType,
    settings: { USDTOAED } = {},
  } = useSettings();
  const [moneyType, setMoneyType] = useState('USD');
  const [moneyPlaceHolder, setMoneyTypePlaceholder] = useState('جۆری پارە');
  const [moneyDropDown, setMoneyDropDown] = useState(false);
  const handleMoneyType = value => {
    setMoneyType(value);
  };
  const { isLoading: isEditingArray, mutate: editArrayInventoryItem } =
    useMutation({
      mutationFn: UpdateArrayOfItms,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'inventory',
            'seller_transaction',
            'transaction_purchases',
            'sellerData',
          ],
        });

        reset();
        setSellerid(null);
        setItemid(null);
        setTransactionPurchese([]);
        setArrayOfItems([]);
        toast.success('کاڵاکەت بە سەرکەوتوی دەستکاری کرا', {
          style: {
            padding: '16px',
            color: '#713200',
            backgroundColor: '#fff',
            zIndex: 100,
          },
        });
      },
      onError: err =>
        toast.error(err.message, {
          style: {
            padding: '16px',
            backgroundColor: '#fff',
            zIndex: 100,
          },
        }),
    });
  const { isLoading: isAddingpurchese, mutate: addingPurchease } = useMutation({
    mutationFn: AddTransactionPurchease,
    onSuccess: () => {
      const updatedArray2 = transactionPurchese.map(item2 => {
        const matchingItem = inventoryItems.find(
          item1 => item1.id === item2.id,
        );

        if (matchingItem) {
          // Update the item in array 2 based on some condition
          return {
            ...matchingItem,
            item_quantity:
              Number(matchingItem.item_quantity) - Number(item2.item_quantity),
            total_sell:
              Number(item2.item_quantity) + Number(matchingItem.total_sell),
            total_price:
              (Number(matchingItem.item_quantity) -
                Number(item2.item_quantity)) *
              Number(matchingItem?.item_price), // Update with the desired value from array 1
          };
        }

        // If no match found, return the original item in array 2
      });
      editArrayInventoryItem(updatedArray2);
      toast.success('بە سەرکەوتوی زیاد کرا', {
        style: {
          padding: '16px',
          color: '#713200',
          backgroundColor: '#fff',
          zIndex: 100,
        },
      });
    },
    onError: err =>
      toast.error(err.message, {
        style: {
          padding: '16px',
          backgroundColor: '#fff',
          zIndex: 100,
        },
      }),
  });
  const { isLoading: isAddingerf, mutate: addTransactionfe } = useMutation({
    mutationFn: AddSellerTransaction,
    onSuccess: data => {
      const newData = transactionPurchese.map(item => {
        return {
          sold_item_quantity: item.item_quantity,
          sold_item_price: item.item_price,
          item_id: item.id,
          transaction_id: data.id,
        };
      });

      addingPurchease(newData);

      toast.success('بە سەرکەوتوی زیاد کرا', {
        style: {
          padding: '16px',
          color: '#713200',
          backgroundColor: '#fff',
          zIndex: 100,
        },
      });
    },
    onError: err =>
      toast.error(err.message, {
        style: {
          padding: '16px',
          backgroundColor: '#fff',
          zIndex: 100,
        },
      }),
  });

  useEffect(() => {
    // Update yourArray based on the current searchParams
    // setArrayOfItems(transactionPurchese.splice(0, 10))

    // You can also perform other actions based on the searchParams
    // ...

    setArrayOfItems(
      transactionPurchese.slice(
        ((searchParams.get('children_page') || 1) - 1) * 10,
        (searchParams.get('children_page') || 1) * 10,
      ),
    );
  }, [searchParams.get('children_page')]);
  useEffect(() => {
    // Update yourArray based on the current searchParams
    // setArrayOfItems(transactionPurchese.splice(0, 10))

    // You can also perform other actions based on the searchParams
    // ...

    setArrayOfItems(transactionPurchese.slice((page - 1) * 10, page * 10));
    setTotal(
      transactionPurchese.reduce(
        (sum, item) => sum + Number(item.total_price),
        0,
      ),
    );
  }, [transactionPurchese]);
  // useEffect(() => {
  //   // Update yourArray based on the current searchParam

  //   // You can also perform other actions based on the searchParams
  //   // ...
  //   setArrayOfItems(transactionPurchese.splice(0, 10))
  // }, [transactionPurchese]);
  function onFormSubmit(data) {
    if (
      transactionPurchese.length === 0 ||
      sellerid === null ||
      sellerid === undefined ||
      !data.current_date
    ) {
      return;
    }
    const utcTime = new Date(data.current_date).toISOString();
    const newTransaction = {
      note: data.note || '',
      inventory_receipt: Number(lastItem[0]?.id ? lastItem[0]?.id : 1) + 1,
      returning_date: data.return_date ? data.return_date : data?.current_date,
      transaction_date: utcTime,
      outgoing_purchase:
        data?.incoming_money &&
        data?.incoming_money !== undefined &&
        data?.incoming_money !== null &&
        data?.incoming_money !== ''
          ? Number(data.incoming_money)
          : 0,
      total_purchase:
        Number(total) -
        (data?.incoming_money &&
        data?.incoming_money !== undefined &&
        data?.incoming_money !== null &&
        data?.incoming_money !== ''
          ? Number(data.incoming_money)
          : 0),
      ingoing_purchase: Number(total),
      returning_date_reminder: data.return_date
        ? data.return_date
        : data?.current_date,
      seller_id: sellerid,
    };
    addTransactionfe(newTransaction);

    // if (sellerName !== undefined && sellerName !== null) {
    //   setTransactionPurchese([...transactionPurchese, newData]);
    //   setNullValue(false);
    //   // reset();
    // } else {
    //   setNullValue(true);
    // }
  }

  const [showInvoice, setShowInvoice] = useState(false);
  const [lang, setLang] = useState(null);
  const [money, setMoney] = useState(null);

  const handleAccType = value => {
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };

  function removeItemFromPurchese(item) {
    if (transactionPurchese.length == 1) {
      setTransactionPurchese([]);
      setArrayOfItems([]);
      setItemid(null);
      setValue('item_price', null);
      setValue('item_quantity', null);
    }
    setTransactionPurchese(prev =>
      prev.filter(prevItem => {
        if (
          prevItem.id == item.id &&
          prevItem.item_quantity == item.item_quantity &&
          prevItem.item_price == item.item_price
        ) {
          return false;
        }
        return true;
      }),
    );
  }
  function changePrintValues(params) {
    const utcTime = new Date(params.current_date).toISOString();
    const dataForPrint = {
      seller_name: sellerItem?.find(seller => seller.id == sellerid)
        ?.seller_name,
      note: params.note,
      transaction_date: utcTime,
      return_date: params.return_date ? params.return_date : undefined,
      ingoing_money:
        params?.incoming_money &&
        params?.incoming_money !== undefined &&
        params?.incoming_money !== null &&
        params?.incoming_money !== ''
          ? Number(params.incoming_money)
          : 0,
      total: Number(total),
      areayOfItems: transactionPurchese,
      invoice_number: Number(lastItem[0]?.id ? lastItem[0]?.id : 1) + 1,
    };
    setPrintData({
      ...dataForPrint,
      transaction_date: moment(dataForPrint?.transaction_date).format('lll'),
    });
  }
  function checkIfUserSelectedAndArrayIsEmpty() {
    if (
      sellerid === null ||
      sellerid === undefined ||
      transactionPurchese.length === 0
    ) {
      return true;
    }
    return false;
  }
  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      {showInvoice && (
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gray-100">
          <div className="rtl  p-7">
            <IoIosCloseCircle
              onClick={() => {
                setShowInvoice(false);
                setLang(null);
                setMoney(null);
                setLangPlaceHolder('زمان هەڵبژێرە');
                setMoneyPlaceHolder('جۆری دراو هەڵبژێرە');
              }}
              className="cursor-pointer text-7xl text-main"
            />
          </div>
          <SingleInvoice
            type="sell"
            lang={lang}
            moneyType={money}
            data={printData}
            setLang={setLang}
            setMoney={setMoney}
            setShowInvoice={setShowInvoice}
            personsBalance={{
              total: sellerData?.total - printData?.ingoing_money,
            }}
          />
        </div>
      )}
      <div className="flex flex-col justify-between  gap-4 rounded-xl bg-white p-10">
        <div className=" flex flex-row justify-between gap-4">
          <SellerList
            className="!w-1/ h-16 flex-shrink-0 text-lg"
            sellerItem={sellerItem}
            isLoading={SellerLoding}
            count={sellerCount}
            sellerid={sellerid}
            setSellerid={setSellerid}
          />

          <div
            onClick={() => {
              setAccDrop(!accDrop);
            }}
            className={` rtl relative flex w-1/2 cursor-pointer flex-row bg-white shadow-md transition-all duration-200 ease-in-out ${
              accDrop === true && 'rounded-b-none rounded-t-xl'
            } items-center  justify-between rounded-xl`}
          >
            <p className="p-3 px-4 text-2xl">{accPlaceholder}</p>
            <IoIosArrowDropdownCircle
              className={`ml-4 text-4xl text-main transition-all duration-200 ease-in-out 2xl:text-5xl ${
                accDrop === true && 'rotate-180'
              }`}
            />
            {accDrop === true && (
              <div className="absolute top-full z-10 w-full rounded-b-xl bg-white shadow">
                <p
                  onClick={() => {
                    handleAccType('Local');
                    setAccPlaceHolder('ناوخۆ');
                  }}
                  className="p-2 text-2xl hover:bg-gray-100"
                >
                  ناوخۆ
                </p>
                <p
                  onClick={() => {
                    handleAccType('Oversea');
                    setAccPlaceHolder('دەرەوە');
                  }}
                  className="p-2 text-2xl hover:bg-gray-100"
                >
                  دەرەوە
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto mt-10 h-1 w-1/3 bg-gray-200"></div>

        <div className="flex w-full flex-col gap-4 ">
          <div className="rtl mt-10 flex flex-row justify-between gap-4">
            <FormRowVertical
              error={errors?.item_name?.message}
              className="w-1/2 !py-0"
            >
              <ItemList
                className={`w-full`}
                sellerItem={inventoryItems}
                isLoading={isLoading}
                count={count}
                setPersonsData={setPersonsData}
                personData={personData}
                itemid={itemid}
                setItemName={setItemName}
                itemName={itemName}
                setItemid={setItemid}
                setValue={setValue}
              />
            </FormRowVertical>

            <FormRowVertical
              error={errors?.item_quantity?.message}
              className="w-1/2 !py-0"
            >
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  min={0}
                  id="item_quantity"
                  autoComplete="item_quantity"
                  {...register('item_quantity', {
                    max: {
                      value: 10,
                      message: 'This input exceed maxLength.',
                    },
                  })}
                />
                <label
                  htmlFor="item_quantity"
                  className="ml-4  min-w-fit cursor-pointer text-gray-500"
                >
                  بڕ
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className="rtl flex flex-row justify-between gap-4 ">
            <FormRowVertical
              error={errors?.item_price?.message}
              className="w-1/2 !py-0"
            >
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  min={0}
                  id="item_price"
                  autoComplete="item_price"
                  {...register('item_price')}
                />
                <label
                  htmlFor="item_price"
                  className="ml-4  min-w-fit cursor-pointer text-gray-500"
                >
                  نرخی کاڵا
                </label>
              </div>
            </FormRowVertical>
            <div
              onClick={() => {
                setMoneyDropDown(!moneyDropDown);
              }}
              className={` rtl relative mb-2 flex w-1/2 cursor-pointer flex-row bg-white shadow-md transition-all duration-200 ease-in-out ${
                moneyDropDown === true && 'rounded-b-none rounded-t-xl'
              } items-center  justify-between rounded-xl`}
            >
              <p className="p-3 px-4 text-2xl">{moneyPlaceHolder}</p>
              <IoIosArrowDropdownCircle
                className={`ml-4 text-4xl text-main transition-all duration-200 ease-in-out 2xl:text-5xl ${
                  moneyDropDown === true && 'rotate-180'
                }`}
              />
              {moneyDropDown === true && (
                <div className="absolute top-full z-10 w-full rounded-b-xl bg-white shadow">
                  <p
                    onClick={() => {
                      handleMoneyType('USD');
                      setMoneyTypePlaceholder('دۆلار');
                    }}
                    className="p-2 text-2xl hover:bg-gray-100"
                  >
                    دۆلار
                  </p>
                  <p
                    onClick={() => {
                      handleMoneyType('AUD');
                      setMoneyTypePlaceholder('درهەم');
                    }}
                    className="p-2 text-2xl hover:bg-gray-100"
                  >
                    درهەم
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (!itemid) {
                  setError('item_name', {
                    type: 'custom',
                    message: 'کاڵا دیاری بکە',
                  });
                  return;
                }
                if (
                  getValues('item_price') === null ||
                  getValues('item_price') === '' ||
                  getValues('item_price') == undefined
                ) {
                  setError('item_price', {
                    type: 'custom',
                    message: 'نرخی کاڵا نابێت بەتاڵبێت',
                  });
                  return;
                }
                if (
                  getValues('item_quantity') === null ||
                  getValues('item_quantity') === '' ||
                  getValues('item_quantity') == undefined
                ) {
                  setError('item_quantity', {
                    type: 'custom',
                    message: 'بڕی کاڵا نابێت بەتاڵ بێت',
                  });
                  return;
                }
                if (
                  Number(getValues('item_quantity')) >
                  inventoryItems?.find(item => item.id == itemid)?.item_quantity
                ) {
                  setError('item_quantity', {
                    type: 'custom',
                    message: `بڕی کاڵا نابێت زیاتربێت لە بڕی کاڵا لە کۆگا ( ${
                      inventoryItems?.find(item => item.id == itemid)
                        ?.item_quantity
                    }) بڕ`,
                  });
                  return;
                }
                clearErrors(['item_price', 'item_quantity']);
                setTransactionPurchese([
                  ...transactionPurchese,
                  {
                    ...inventoryItems.find(item => item.id == itemid),
                    item_quantity: Number(getValues('item_quantity')),
                    item_price:
                      moneyType == 'USD'
                        ? Number(getValues('item_price'))
                        : (moneyType == 'AUD' &&
                            Number(getValues('item_price')) / USDTOAED) ||
                          0,
                    total_price:
                      Number(getValues('item_quantity')) *
                      (moneyType == 'USD'
                        ? Number(getValues('item_price'))
                        : (moneyType == 'AUD' &&
                            Number(getValues('item_price')) / USDTOAED) ||
                          0),
                  },
                ]);
                setItemid(null);
                setValue('item_price', null);
                setValue('item_quantity', null);
                clearErrors();
              }}
              type="button"
              size="large"
              className="w-1/2 !text-xl !outline-none"
            >
              زیاد کردن
            </Button>
          </div>

          <div className=" mt-4 flex flex-col justify-between gap-4 rounded-xl bg-white p-10 shadow-[0px_0px_5px_0px_#2e5bff50]">
            <div className="rtl mb-4 flex flex-row gap-5 text-xl lg:text-2xl">
              <div className="flex flex-1 flex-col gap-3">
                <div className="rtl flex flex-col flex-wrap gap-x-10 gap-y-3">
                  <div className="flex-shrink-0">
                    ناوی كڕیار :{' '}
                    {
                      sellerItem?.find(seller => seller.id == sellerid)
                        ?.seller_name
                    }
                  </div>
                  <div className="flex-shrink-0">
                    ژمارەی وەصڵ : {watch('invoice_number')}
                  </div>
                </div>
                <div className="rtl flex flex-col flex-wrap gap-x-10 gap-y-3">
                  <div className="flex-shrink-0">
                    بەروار :{watch('current_date')}
                  </div>
                  <div>کۆی گشتی پارە : {formatCurrency(total)} </div>
                </div>
              </div>
              <div className="my-auto h-36 w-1 bg-slate-300 lg:mx-2"></div>
              <div className="flex w-[280px] flex-1 flex-col">
                <p className="">تێبینی : </p>
                <p className="">{watch('note')}</p>
              </div>
            </div>
            <Table columns="grid-cols-5 ">
              <Table.Header>
                <div className=""></div>
                <div className="text-no min-w-full text-2xl">کۆی نرخی کاڵا</div>
                <div className="text-2xl"> نرخی کاڵا</div>
                <div className="text-2xl">بڕ</div>
                <div className="text-2xl">ناوی کاڵا</div>
              </Table.Header>

              <Table.Body
                data={arrayOfItems}
                render={(item, index) => (
                  <TransactionPurcheseRow
                    data={item}
                    item={item}
                    key={`${item?.id}-${index}`} // Use a combination of id and index
                    removeItemFromPurchese={removeItemFromPurchese}
                  />
                )}
              />

              <Table.Footer>
                <Pagination
                  count={transactionPurchese.length}
                  filterBy="children_page"
                />
              </Table.Footer>
            </Table>
          </div>
          <div className="mt-4 flex flex-row gap-4">
            <FormRowVertical
              error={errors?.incoming_money?.message}
              className="w-1/2 !py-0"
            >
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  min={0}
                  id="incoming_money"
                  autoComplete="incoming_money"
                  {...register('incoming_money')}
                />
                <label
                  htmlFor="incoming_money"
                  className="ml-4  min-w-fit cursor-pointer text-gray-500"
                >
                  پارەی هاتوو
                </label>
              </div>
            </FormRowVertical>
            <FormRowVertical
              error={errors?.current_date?.message}
              className="w-1/2 !py-0"
            >
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="datetime-local"
                  id="current_date"
                  autoComplete="current_date"
                  {...register('current_date', {
                    required: 'ناوی كڕیار داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="current_date"
                  className="ml-4  min-w-fit cursor-pointer text-gray-500"
                >
                  بەروار
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className="mt-4 flex flex-row gap-8">
            <FormRowVertical
              error={errors?.return_date?.message}
              className="w-1/2 gap-8 !py-0"
            >
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="date"
                  id="return_date"
                  autoComplete="return_date"
                  {...register('return_date')}
                />
                <label
                  htmlFor="return_date"
                  className="ml-4  min-w-fit cursor-pointer text-gray-500"
                >
                  بەرواری گەڕاندنەوە
                </label>
              </div>
              <Modal>
                <div onClick={() => changePrintValues(getValues())}>
                  <Modal.Open opens="openLang">
                    <Button
                      size="large"
                      type="button"
                      disabled={
                        !isValid || checkIfUserSelectedAndArrayIsEmpty()
                      }
                      className=" block w-full !text-xl !outline-none"
                    >
                      پرینت
                    </Button>
                  </Modal.Open>
                </div>
                <Modal.Window name="openLang">
                  <PrintModal
                    // isAdding={isAdding}
                    setLangDrop={setLangDrop}
                    langDrop={langDrop}
                    setMoneyDrop={setMoneyDrop}
                    langPlaceholder={langPlaceholder}
                    setLangPlaceHolder={setLangPlaceHolder}
                    moneyDrop={moneyDrop}
                    moneyPlaceholder={moneyPlaceholder}
                    setMoneyPlaceHolder={setMoneyPlaceHolder}
                    setShowInvoice={setShowInvoice}
                    lang={lang}
                    setLang={setLang}
                    money={money}
                    setMoney={setMoney}
                  />
                </Modal.Window>
              </Modal>
            </FormRowVertical>
            <FormRowVertical className="h-auto w-1/2 !py-0">
              <div className="ltr flex h-full flex-row justify-between rounded-lg p-3 shadow-md">
                <textarea
                  className="h-full w-full resize-none text-3xl"
                  id="note"
                  autoComplete="note"
                  rows={4}
                  {...register('note')}
                />
                <label
                  htmlFor="note"
                  className="ml-4  min-w-fit cursor-pointer text-lg text-gray-500"
                >
                  تێبینی
                </label>
              </div>
            </FormRowVertical>
          </div>
          <div className="flex flex-row-reverse items-center gap-4">
            <div className="w-1/2">
              <Modal>
                <Modal.Window name="openLang">
                  <div className="flex w-[350px] flex-col gap-8 2xl:w-[500px] ">
                    <div
                      onClick={() => {
                        setLangDrop(!langDrop);
                        setMoneyDrop(false);
                      }}
                      className={`rtl relative flex cursor-pointer flex-row bg-white transition-all duration-200 ease-in-out ${
                        langDrop === true && 'rounded-b-none rounded-t-xl'
                      } items-center  justify-between rounded-xl`}
                    >
                      <p className="p-2 px-4">{langPlaceholder}</p>
                      <IoIosArrowDropdownCircle
                        className={`ml-4 text-4xl text-main transition-all duration-200 ease-in-out 2xl:text-5xl ${
                          langDrop === true && 'rotate-180'
                        }`}
                      />
                      {langDrop === true && (
                        <div className="absolute top-full z-10 w-full rounded-b-xl bg-white">
                          <p
                            onClick={() => {
                              setLangPlaceHolder('کوردی');
                            }}
                            className="p-2 hover:bg-gray-100"
                          >
                            کوردی
                          </p>
                          <p
                            onClick={() => {
                              setLangPlaceHolder('عەرەبی');
                            }}
                            className="p-2 hover:bg-gray-100"
                          >
                            عەرەبی
                          </p>
                          <p
                            onClick={() => {
                              setLangPlaceHolder('ئینگلیزی');
                            }}
                            className="p-2 hover:bg-gray-100"
                          >
                            ئینگلیزی
                          </p>
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        setMoneyDrop(!moneyDrop);
                        setLangDrop(false);
                      }}
                      className={`rtl relative flex cursor-pointer flex-row bg-white transition-all duration-200 ease-in-out ${
                        moneyDrop === true && 'rounded-b-none rounded-t-xl'
                      } items-center  justify-between rounded-xl`}
                    >
                      <p className="p-2 px-4">{moneyPlaceholder}</p>
                      <IoIosArrowDropdownCircle
                        className={`ml-4 text-4xl text-main transition-all duration-200 ease-in-out 2xl:text-5xl ${
                          moneyDrop === true && 'rotate-180'
                        }`}
                      />
                      {moneyDrop === true && (
                        <div className="absolute top-full z-10 w-full rounded-b-xl bg-white">
                          <p
                            onClick={() => {
                              setMoneyPlaceHolder('دۆلار');
                            }}
                            className="p-2 hover:bg-gray-100"
                          >
                            دۆلار
                          </p>
                          <p
                            onClick={() => {
                              setMoneyPlaceHolder('درهەم');
                            }}
                            className="p-2 hover:bg-gray-100"
                          >
                            درهەم
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="rtl flex flex-row justify-start gap-6">
                      <Modal.Open close="openLang">
                        <Button
                          type="button"
                          variation="discard"
                          size="large"
                          className="w-1/3  !text-xl !outline-none"
                        >
                          ڕەتکردنەوە
                        </Button>
                      </Modal.Open>
                    </div>
                  </div>
                </Modal.Window>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

function TransactionPurcheseRow({ item, removeItemFromPurchese }) {
  return (
    <Table.Row className="border-t  border-gray-200">
      <button
        type="button"
        onClick={() => {
          removeItemFromPurchese(item);
        }}
      >
        X
      </button>
      <p className="text-xl 2xl:text-3xl">
        {formatCurrency(item?.total_price)}
      </p>
      <p className="text-xl 2xl:text-3xl">{formatCurrency(item?.item_price)}</p>

      <p className="text-xl 2xl:text-3xl">{item?.item_quantity}</p>

      <p className="text-xl 2xl:text-3xl">{item?.item_name}</p>
    </Table.Row>
  );
}

function PrintModal({
  onCloseModal,
  setShowInvoice,
  setLangDrop,
  langDrop,
  setMoneyDrop,
  langPlaceholder,
  setLangPlaceHolder,
  moneyDrop,
  moneyPlaceholder,
  setMoneyPlaceHolder,
  lang,
  setLang,
  money,
  setMoney,
  isAdding,
}) {
  return (
    <div className="flex w-[350px] flex-col gap-8 2xl:w-[500px] ">
      <div
        onClick={() => {
          setLangDrop(!langDrop);
          setMoneyDrop(false);
        }}
        className={`rtl relative flex cursor-pointer flex-row bg-white transition-all duration-200 ease-in-out ${
          langDrop === true && 'rounded-b-none rounded-t-xl'
        } items-center  justify-between rounded-xl`}
      >
        <p className="p-2 px-4">{langPlaceholder}</p>
        <IoIosArrowDropdownCircle
          className={`ml-4 text-4xl text-main transition-all duration-200 ease-in-out 2xl:text-5xl ${
            langDrop === true && 'rotate-180'
          }`}
        />
        {langDrop === true && (
          <div className="absolute top-full z-10 w-full rounded-b-xl bg-white">
            <p
              onClick={() => {
                setLangPlaceHolder('کوردی');
                setLang('ku');
              }}
              className="p-2 hover:bg-gray-100"
            >
              کوردی
            </p>
            <p
              onClick={() => {
                setLangPlaceHolder('عەرەبی');
                setLang('ar');
              }}
              className="p-2 hover:bg-gray-100"
            >
              عەرەبی
            </p>
            <p
              onClick={() => {
                setLangPlaceHolder('ئینگلیزی');
                setLang('en');
              }}
              className="p-2 hover:bg-gray-100"
            >
              ئینگلیزی
            </p>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          setMoneyDrop(!moneyDrop);
          setLangDrop(false);
        }}
        className={`rtl relative flex cursor-pointer flex-row bg-white transition-all duration-200 ease-in-out ${
          moneyDrop === true && 'rounded-b-none rounded-t-xl'
        } items-center  justify-between rounded-xl`}
      >
        <p className="p-2 px-4">{moneyPlaceholder}</p>
        <IoIosArrowDropdownCircle
          className={`ml-4 text-4xl text-main transition-all duration-200 ease-in-out 2xl:text-5xl ${
            moneyDrop === true && 'rotate-180'
          }`}
        />
        {moneyDrop === true && (
          <div className="absolute top-full z-10 w-full rounded-b-xl bg-white">
            <p
              onClick={() => {
                setMoneyPlaceHolder('دۆلار');
                setMoney('USD');
              }}
              className="p-2 hover:bg-gray-100"
            >
              دۆلار
            </p>
            <p
              onClick={() => {
                setMoneyPlaceHolder('درهەم');
                setMoney('AED');
              }}
              className="p-2 hover:bg-gray-100"
            >
              درهەم
            </p>
          </div>
        )}
      </div>
      <div className="rtl flex flex-row justify-start gap-6">
        <Button
          disabled={lang === null || money === null}
          type="button"
          size="large"
          onClick={() => {
            setShowInvoice(true);
            onCloseModal();
          }}
          className="w-1/3  !text-xl !outline-none"
        >
          پرێنت
        </Button>

        <Modal.Open close="openLang">
          <Button
            type="button"
            variation="discard"
            size="large"
            className="w-1/3  !text-xl !outline-none"
          >
            ڕەتکردنەوە
          </Button>
        </Modal.Open>
      </div>
    </div>
  );
}