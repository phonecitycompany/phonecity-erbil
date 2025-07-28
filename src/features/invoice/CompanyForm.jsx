import React, { useState } from 'react';
import { useCompanyItem } from '../company/useCompanyItem';
import CompanyList from '../company/CompanyList';
import FormRowVertical from '../../ui/FormRowVertical';
import Row from '../../ui/Row';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import Modal from '../../ui/Modal';
import { IoIosArrowDropdownCircle, IoIosCloseCircle } from 'react-icons/io';
import SingleInvoice from '../../pages/SingleInvoice';
import { is } from 'date-fns/locale';
import { useAddCompanyTransaction } from '../company/useAddCompanyTransaction';
import { sub } from 'date-fns';
import { useGetLastCompanyItem } from './useGetLastcompanyItem';
import { useGetCompanyTotal } from './useGetCompanyTotal';
import moment from 'moment';

export default function CompanyForm() {
  const { companyItem, isLoading, count } = useCompanyItem();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors, isValid } = formState;
  const [companyData, setCompanyData] = useState();
  const { lastItem, lastItemLoading } = useGetLastCompanyItem();
  const [companyId, setCompanyId] = useState();
  const { isLoading: isTotalForCompanyLoading, companyTotalData } =
    useGetCompanyTotal();
  const { isAdding, addCompanyTransactionItem } = useAddCompanyTransaction();
  const [printData, setPrintData] = useState({});
  const [lang, setLang] = useState(null);
  const [money, setMoney] = useState(null);
  const [langDrop, setLangDrop] = useState(false);
  const [moneyDrop, setMoneyDrop] = useState(false);
  const [langPlaceholder, setLangPlaceHolder] = useState('زمان هەڵبژێرە');
  const [moneyPlaceholder, setMoneyPlaceHolder] =
    useState('جۆری دراو هەڵبژێرە');

  const [invoiceData, setInvoiceData] = useState();
  async function onFormSubmit(data) {
    if (!data.date) {
      return;
    }
    const yesterday = sub(new Date(data?.reminder_date), { days: 2 });
    const utcTime = new Date(data?.date).toISOString();
    const editedUser = {
      transaction_date: utcTime,
      ingoing_purchase:
        data?.money_number &&
        data?.money_number !== undefined &&
        data?.money_number !== null &&
        data?.money_number !== ''
          ? data?.money_number
          : 0,
      outgoing_purchase:
        data?.total_money &&
        data?.total_money !== undefined &&
        data?.total_money !== null &&
        data?.total_money !== ''
          ? data?.total_money
          : 0,
      total_purchase:
        (data?.money_number &&
        data?.money_number !== undefined &&
        data?.money_number !== null &&
        data?.money_number !== ''
          ? data?.money_number
          : 0) -
        (data?.total_money &&
        data?.total_money !== undefined &&
        data?.total_money !== null &&
        data?.total_money !== ''
          ? data?.total_money
          : 0),
      returning_date: data?.reminder_date ? data?.reminder_date : data?.date,
      inventory_receipt: Number(lastItem[0]?.id ? lastItem[0]?.id : 1) + 1,
      note: data?.note,
      company_id: companyId,
      returning_date_reminder: data?.reminder_date ? yesterday : data?.date,
    };
    addCompanyTransactionItem(editedUser);
    if (!isAdding) {
      reset();
      // setPrintData({});
    }
  }
  function changePrintValues(params) {
    const data = {
      money_number:
        params?.money_number &&
        params?.money_number !== undefined &&
        params?.money_number !== null &&
        params?.money_number !== ''
          ? params?.money_number
          : 0,
      company_name: companyItem?.find(company => company.id === companyId)
        ?.company_name,
      reminder_date: params?.reminder_date,
      note: params?.note,
      invoice_number: Number(lastItem[0]?.id ? lastItem[0]?.id : 1) + 1,
      total_money:
        params?.total_money &&
        params?.total_money !== undefined &&
        params?.total_money !== null &&
        params?.total_money !== ''
          ? params?.total_money
          : 0,
      date: moment(params?.date).format('lll'),
    };
    setPrintData(data);
  }

  const [showInvoice, setShowInvoice] = useState(false);

  return (
    <>
      <Form
        type="custom"
        className="flex w-full flex-row"
        onSubmit={handleSubmit(onFormSubmit)}
      >
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
              type="company"
              lang={lang}
              moneyType={money}
              data={printData}
              setLang={setLang}
              setMoney={setMoney}
              setShowInvoice={setShowInvoice}
              personsBalance={companyTotalData}
            />
          </div>
        )}
        <div className="mt-10 flex w-full flex-row-reverse gap-4 rounded-xl bg-white p-10">
          <div className="flex w-full flex-col gap-4 text-lg lg:text-xl xl:w-1/2">
            <CompanyList
              className="w-full"
              companyItem={companyItem}
              isLoading={isLoading}
              count={count}
              setCompanyData={setCompanyData}
              companyData={companyData}
              companyId={companyId}
              setCompanyId={setCompanyId}
            />
            <FormRowVertical
              classNameError="2xl:text-4xl !text-lg"
              error={errors?.total_money?.message}
              className="!py-0"
            >
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full text-xl "
                  type="number"
                  min={0}
                  id="total_money"
                  autoComplete="total_money"
                  {...register('total_money')}
                />
                <label
                  htmlFor="total_money"
                  className="ml-4 min-w-fit cursor-pointer text-xl text-gray-500 2xl:text-2xl"
                >
                  کۆی گشتی پارە
                </label>
              </div>
            </FormRowVertical>
            <FormRowVertical
              classNameError="2xl:text-2xl !text-lg"
              error={errors?.date?.message}
              className="!py-0"
            >
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full text-xl "
                  type="datetime-local"
                  id="date"
                  autoComplete="date"
                  {...register('date', {
                    required: ' بەروار داغڵ بکە',
                  })}
                />
                <label
                  htmlFor="date"
                  className="ml-4 min-w-fit cursor-pointer text-xl text-gray-500 2xl:text-2xl"
                >
                  بەروار
                </label>
              </div>
            </FormRowVertical>
            <Modal>
              <div onClick={() => changePrintValues(getValues())}>
                <Modal.Open opens="openLang">
                  <Button
                    type="button"
                    size="large"
                    disabled={!isValid}
                    className="hidden w-full !text-xl !outline-none xl:block"
                  >
                    پرینت
                  </Button>
                </Modal.Open>
              </div>
              <Modal.Window name="openLang">
                <PrintModal
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
            <FormRowVertical
              classNameError="2xl:text-2xl !text-lg"
              error={errors?.money_number?.message}
              className="!py-0"
            >
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full text-xl "
                  type="number"
                  min={0}
                  id="money_number"
                  autoComplete="money_number"
                  {...register('money_number')}
                />
                <label
                  htmlFor="money_number"
                  className="ml-4 min-w-fit cursor-pointer text-xl text-gray-500 2xl:text-2xl"
                >
                  بڕی پارەی دراو
                </label>
              </div>
            </FormRowVertical>
            <FormRowVertical
              classNameError="2xl:text-2xl !text-lg"
              error={errors?.reminder_date?.message}
              className="!py-0"
            >
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full text-xl "
                  type="date"
                  id="reminder_date"
                  autoComplete="reminder_date"
                  {...register('reminder_date', {})}
                />
                <label
                  htmlFor="reminder_date"
                  className="ml-4 min-w-fit cursor-pointer text-xl text-gray-500 2xl:text-2xl"
                >
                  بیرخەرەوە
                </label>
              </div>
            </FormRowVertical>
            <FormRowVertical className="!py-0">
              <div className="input ltr flex flex-row justify-between">
                <input
                  className="w-full text-xl "
                  type="text"
                  id="note"
                  autoComplete="note"
                  {...register('note')}
                />
                <label
                  htmlFor="note"
                  className="ml-4 min-w-fit cursor-pointer text-xl text-gray-500 2xl:text-2xl"
                >
                  تێبینی
                </label>
              </div>
            </FormRowVertical>

            <Modal>
              <Modal.Open opens="openLang">
                <Button
                  size="large"
                  type="button"
                  disabled={!isValid}
                  className="block w-full !text-xl !outline-none xl:hidden"
                >
                  پرینت
                </Button>
              </Modal.Open>
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
                    <Button
                      size="large"
                      type="button"
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
              </Modal.Window>
            </Modal>
          </div>
        </div>
      </Form>
    </>
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
          size="large"
          type="button"
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