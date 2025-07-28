import React, { useState } from 'react';
// import { useCompanyItem } from '../company/useCompanyItem';
import { useSellerItem } from '../sellers/useSellerItem';
// import CompanyList from '../company/CompanyList';
import SellerList from '../sellers/SellerList';
import FormRowVertical from '../../ui/FormRowVertical';
import Row from '../../ui/Row';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { IoIosArrowDropdownCircle, IoIosCloseCircle } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import SingleInvoice from '../../pages/SingleInvoice';
import { HiMiniLockClosed } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import { useAddSellerTransactionItem } from './useAddSellerTransactionItem';
import { useGetLastItem } from './useGetLastItem';
import { useGetPersonTotal } from './useGetPersonTotal';
import moment from 'moment';
export default function GetMoneyForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors, isValid } = formState;
  const { sellerItem, isLoading, count } = useSellerItem();
  const { lastItem, lastItemLoading } = useGetLastItem();
  const [setPersonsData, personData] = useState();
  const [sellerid, setSellerid] = useState();
  const [printData, setPrintData] = useState({});
  const [lang, setLang] = useState(null);
  const [money, setMoney] = useState(null);
  const [langDrop, setLangDrop] = useState(false);
  const [moneyDrop, setMoneyDrop] = useState(false);
  const [accDrop, setAccDrop] = useState(false);
  const { isAdding, addTransaction } = useAddSellerTransactionItem();
  const { isLoading: userTotaoLoding, sellerData } = useGetPersonTotal();
  const [langPlaceholder, setLangPlaceHolder] = useState('زمان هەڵبژێرە');
  const [moneyPlaceholder, setMoneyPlaceHolder] =
    useState('جۆری دراو هەڵبژێرە');
  const [accPlaceholder, setAccPlaceHolder] = useState('جۆری حساب');

  const [searchParams, setSearchParams] = useSearchParams();

  const handleAccType = value => {
    searchParams.set('tab', value);
    setSearchParams(searchParams);
  };

  const [showInvoice, setShowInvoice] = useState(false);

  async function onFormSubmit(data) {
    // console.log(data, sellerid);
    // setPrintData(data);
    // console.log(printData);
    if (!data.seller_name || !data.date || !data.money_number || !sellerid) {
      return;
    }
    const utcTime = new Date(data.date).toISOString();
    const editedUser = {
      note: data.note,
      received_from: data.seller_name,
      inventory_receipt: Number(lastItem[0]?.id ? lastItem[0]?.id : 1) + 1,
      returning_date: data.date,
      transaction_date: utcTime,
      outgoing_purchase: data.money_number,
      total_purchase: data.money_number * -1,
      ingoing_purchase: 0,
      returning_date_reminder: data.date,
      seller_id: sellerid,
    };
    addTransaction(editedUser);
    if (!isAdding) {
      reset();
      setPrintData({});
    }
  }
  function changePrintValues(params) {
    const utcTime = new Date(params.date).toISOString();
    const data = {
      receved_from: params.seller_name,
      amount: params.money_number,
      seller_name: sellerItem?.find(seller => seller.id == sellerid)
        ?.seller_name,
      transaction_date: utcTime,
      note: params.note,
      invoice_number: Number(lastItem[0]?.id ? lastItem[0]?.id : 1) + 1,
    };
    setPrintData({
      ...data,
      transaction_date: moment(data?.transaction_date).format('lll'),
    });
  }
  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="">
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
            type="getMoney"
            lang={lang}
            moneyType={money}
            data={printData}
            setLang={setLang}
            setMoney={setMoney}
            setShowInvoice={setShowInvoice}
            personsBalance={sellerData}
          />
        </div>
      )}
      <div className=" mt-10 flex flex-col justify-between  gap-4 rounded-xl bg-white p-10 xl:flex-row-reverse">
        <div className="flex w-full flex-col gap-4 xl:w-1/2">
          <div
            onClick={() => {
              setAccDrop(!accDrop);
            }}
            className={` rtl relative flex h-16 flex-shrink-0 cursor-pointer flex-row bg-white text-xl shadow-md transition-all duration-200 ease-in-out ${
              accDrop === true && 'rounded-b-none rounded-t-xl'
            } items-center  justify-between rounded-xl`}
          >
            <p className="p-3 px-4">{accPlaceholder}</p>
            <IoIosArrowDropdownCircle
              className={`ml-4 text-4xl text-main transition-all duration-200 ease-in-out 2xl:text-5xl ${
                accDrop === true && 'rotate-180'
              }`}
            />
            {accDrop === true && (
              <div className="absolute top-full z-10 w-full rounded-b-xl bg-white">
                <p
                  onClick={() => {
                    handleAccType('Local');
                    setAccPlaceHolder('ناوخۆ');
                  }}
                  className="p-2 text-xl hover:bg-gray-100"
                >
                  ناوخۆ
                </p>
                <p
                  onClick={() => {
                    handleAccType('Oversea');
                    setAccPlaceHolder('دەرەوە');
                  }}
                  className="p-2 text-xl hover:bg-gray-100"
                >
                  دەرەوە
                </p>
              </div>
            )}
          </div>
          <FormRowVertical
            error={errors?.seller_name?.message}
            className="!py-0"
          >
            <div className="input ltr flex flex-row justify-between">
              <input
                className="w-full "
                type="text"
                id="seller_name"
                autoComplete="seller_name"
                {...register('seller_name', {
                  required: 'ناوی كڕیار داغڵ بکە',
                })}
              />
              <label
                htmlFor="seller_name"
                className="ml-4  min-w-fit cursor-pointer text-gray-500"
              >
                وەرگرتن لە
              </label>
            </div>
          </FormRowVertical>
          <FormRowVertical error={errors?.date?.message} className="!py-0">
            <div className="input ltr flex flex-row justify-between">
              <input
                className="w-full "
                type="datetime-local"
                id="date"
                autoComplete="date"
                {...register('date', {
                  required: 'بەروار داغڵ بکە',
                })}
              />
              <label
                htmlFor="date"
                className="ml-4  min-w-fit cursor-pointer text-gray-500"
              >
                بەروار
              </label>
            </div>
          </FormRowVertical>
          <Modal>
            <div onClick={() => changePrintValues(getValues())}>
              <Modal.Open opens="openLang">
                <Button
                  size="large"
                  type="button"
                  disabled={!isValid}
                  className="hidden w-full !text-xl !outline-none xl:block"
                >
                  پرینت
                </Button>
              </Modal.Open>
            </div>
            <Modal.Window name="openLang">
              <PrintModal
                isAdding={isAdding}
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
          {/* 
        <Row type="vertical">
          <p className={` `}>ڕۆژی مەبەست دیاری بکە</p>
          <input
            type="date"
            value={returning_date_state}
            onChange={e => handleData(e.target.value)}
            className={`input  min-w-80  h-12 text-xl`}
          />
        </Row> 
        */}
        </div>
        <div className="flex w-full flex-col gap-4 xl:w-1/2 ">
          <SellerList
            className="h-16 w-full flex-shrink-0 text-lg"
            sellerItem={sellerItem}
            isLoading={isLoading}
            count={count}
            setPersonsData={setPersonsData}
            personData={personData}
            sellerid={sellerid}
            setSellerid={setSellerid}
          />
          <FormRowVertical
            error={errors?.money_number?.message}
            className="!py-0"
          >
            <div className="input ltr flex flex-row justify-between">
              <input
                className="w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                min={0}
                id="money_number"
                autoComplete="money_number"
                {...register('money_number', {
                  required: 'بڕی پارە داغڵ بکە',
                })}
              />
              <label
                htmlFor="money_number"
                className="ml-4  min-w-fit cursor-pointer text-gray-500"
              >
                بڕی پارە
              </label>
            </div>
          </FormRowVertical>

          <FormRowVertical error={errors?.note?.message} className="!py-0">
            <div className="input ltr flex flex-row justify-between">
              <input
                className="w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="text"
                id="note"
                autoComplete="note"
                {...register('note')}
              />
              <label
                htmlFor="note"
                className="ml-4  min-w-fit cursor-pointer text-gray-500"
              >
                تێبینی
              </label>
            </div>
          </FormRowVertical>

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
    </Form>
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
          disabled={lang === null || money === null || isAdding}
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