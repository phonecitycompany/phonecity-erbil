import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoGlobeOutline } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { IoIosArrowDropdownCircle, IoIosCloseCircle } from 'react-icons/io';
import SingleInvoice from '../../pages/SingleInvoice';
import { useState } from 'react';
import Modal from '../../ui/Modal';
import { useGetLastItem } from '../invoice/useGetLastItem';
import AddHmulaForm from './AddHmldaForm';
import AddDiscountForm from './AddDiscountForm';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
export default function TransactionTotal({
  transactionItems,
  isLoading,
  arrayOfSellers,
  sellerid,
  totalforfilter,
  totalforfilterloading,
  accountTotal,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showInvoice, setShowInvoice] = useState(false);
  const { lastItem, lastItemLoading } = useGetLastItem();
  const [lang, setLang] = useState(null);
  const [money, setMoney] = useState(null);
  const [langDrop, setLangDrop] = useState(false);
  const [moneyDrop, setMoneyDrop] = useState(false);
  const [langPlaceholder, setLangPlaceHolder] = useState('زمان هەڵبژێرە');
  const [moneyPlaceholder, setMoneyPlaceHolder] =
    useState('جۆری دراو هەڵبژێرە');

  if (isLoading) return <Spinner />;
  const values = arrayOfSellers?.find(seller => seller.id == sellerid);
  if (!values) return;
  const totalForshow = totalforfilter?.reduce(
    (total, item) => total + (item.ingoing_purchase - item.outgoing_purchase),
    0,
  );
  function reverseArr(input) {
    var ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }
  return (
    <>
      <>
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
              type="mixed"
              lang={lang}
              moneyType={money}
              data={reverseArr(transactionItems)}
              allCombinedData={reverseArr(totalforfilter)}
              setLang={setLang}
              setMoney={setMoney}
              setShowInvoice={setShowInvoice}
              startAt={totalforfilter
                .slice(0, ((searchParams.get('page') || 1) - 1) * PAGE_SIZE)
                .reduce(
                  (total, item) =>
                    total + (item.ingoing_purchase - item.outgoing_purchase),
                  0,
                )}
              acountTotal={accountTotal}
            />
          </div>
        )}
        <div className="mt-5">
          <div className="flex justify-end">
            <div className="flex flex-row-reverse items-center">
              <div className="input flex w-[17rem] justify-between lg:w-[30rem] ">
                <div className="">{formatCurrency(totalForshow)}</div>
                <div className="">کۆی گشتی</div>
              </div>
              <Modal>
                <div>
                  <Modal.Open opens="3mula">
                    <Button
                      type="button"
                      variation="confirm"
                      disabled={isLoading}
                      className="mr-5"
                    >
                      ڕۆشتوو
                    </Button>
                  </Modal.Open>
                  <Modal.Open opens="Dashkandn">
                    <Button
                      type="button"
                      variation="confirm"
                      disabled={isLoading}
                      className="mr-5"
                    >
                      هاتوو
                    </Button>
                  </Modal.Open>
                  <Modal.Open opens="openLang">
                    <Button
                      type="button"
                      variation="confirm"
                      disabled={isLoading}
                      onClick={() => {}}
                      className="mr-5"
                    >
                      کەشف حساب
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
                <Modal.Window name="3mula">
                  <AddHmulaForm lastItem={lastItem} sellerId={sellerid} />
                </Modal.Window>
                <Modal.Window name="Dashkandn">
                  <AddDiscountForm lastItem={lastItem} sellerId={sellerid} />
                </Modal.Window>
              </Modal>
            </div>
          </div>

          <div className="input mt-5 flex w-full flex-col space-y-8 !p-5">
            <div className="relative z-0 flex justify-between">
              <div className="flex items-center space-x-2 text-xl font-bold">
                <span className="text-2xl text-main">
                  <MdEmail />
                </span>
                <span>{values?.seller_email}</span>
              </div>

              <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-black"></div>
              <div className="flex items-center space-x-2 text-xl font-bold">
                <span>{values?.seller_location}</span>
                <span className="text-2xl text-main">
                  <FaLocationDot />
                </span>
              </div>
            </div>
            <div className="relative z-0 flex justify-between">
              <div className="flex items-center space-x-2 text-xl font-bold">
                <span className="text-2xl text-main">
                  <FaPhoneAlt />
                </span>{' '}
                <span>{values?.seller_phone_number}</span>
              </div>
              <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-black"></div>
              <div className="flex items-center space-x-2 text-xl font-bold">
                <span>{values?.seller_website}</span>
                <span className="text-2xl text-main">
                  <IoGlobeOutline />
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
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