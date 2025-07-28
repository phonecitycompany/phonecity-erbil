import React from 'react';
// import { format } from 'date-fns';
import {
  HiEllipsisVertical,
  HiPencil,
  HiTrash,
  HiEllipsisHorizontalCircle,
} from 'react-icons/hi2';
import { LuCalendarDays } from 'react-icons/lu';
import { FaPrint } from 'react-icons/fa6';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency, delimiter } from '../../utils/helpers';
import ButtonIconText from '../../ui/ButtonIconText';
// import ButtonIcon from '../../ui/ButtonIcon';
// import ConfirmDelete from '../../ui/ConfirmDelete';
// import EditItem from './EditItem';
// import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteTransactionItem } from './useDeleteTransactionItem';
import TransactionDetails from './TransactionDetails';
import TransactionReminder from './TransactionReminder';
import { useTransactionPurchese } from './useTransactionPurchese';
import EditTransaction from './EditTransaction';
import { useEditTransaction } from './useEditTransaction';
import { useState } from 'react';
import { IoIosArrowDropdownCircle, IoIosCloseCircle } from 'react-icons/io';
import SingleInvoice from '../../pages/SingleInvoice';
// import { useEditInventoryItems } from './useEditInventoryItems';
import { FaFileDownload } from 'react-icons/fa';
import Button from '../../ui/Button';
import moment from 'moment';
function TransactionRow({
  item: {
    id: transactionItamId,
    seller_id,
    transaction_date,
    ingoing_purchase,
    outgoing_purchase,
    total_purchase,
    sold_item_quantity,
    note,
    returning_date,
    inventory_receipt,
    sellers,
    returning_date_reminder,
    received_from,
    total,
  },
  isAdmin,
  item,
}) {
  // const { checkout, isCheckingOut } = useCheckout();
  const [showInvoice, setShowInvoice] = useState(false);

  const [lang, setLang] = useState(null);
  const [money, setMoney] = useState(null);
  const [langDrop, setLangDrop] = useState(false);
  const [moneyDrop, setMoneyDrop] = useState(false);

  const [langPlaceholder, setLangPlaceHolder] = useState('زمان هەڵبژێرە');
  const [moneyPlaceholder, setMoneyPlaceHolder] =
    useState('جۆری دراو هەڵبژێرە');

  const { deleteTransactionItem, isDeleting } =
    useDeleteTransactionItem(transactionItamId);
  const { purcheseLoading, purcheseCount, transactionPurchese } =
    useTransactionPurchese(transactionItamId);

  const data = {
    receved_from: received_from,
    amount: outgoing_purchase,
    seller_name: sellers?.seller_name,
    transaction_date: moment(transaction_date).format('lll'),
    note: note,
    invoice_number: transactionItamId,
    return_date: returning_date ? returning_date : undefined,
    ingoing_money: ingoing_purchase,
    total: ingoing_purchase - outgoing_purchase,
    areayOfItems:
      transactionPurchese?.length > 0
        ? transactionPurchese?.map(single_item => {
            return {
              item_quantity: single_item?.sold_item_quantity,
              item_price: single_item?.sold_item_price,
              total_price:
                single_item?.sold_item_price * single_item?.sold_item_quantity,
              item_name: single_item?.inventory?.item_name,
            };
          })
        : [
            {
              item_name: 'کاڵاکان بەردەست نییە، تەنها کۆی گشتی پیشان دەدرێت',
              item_price: 0,
              item_quantity: 0,
              total_price: ingoing_purchase - outgoing_purchase,
            },
          ],
  };

  return (
    <Table.Row className="border-t border-gray-200">
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
            type={ingoing_purchase == 0 ? 'getMoney' : 'sell'}
            lang={lang}
            moneyType={money}
            data={data}
            setLang={setLang}
            setMoney={setMoney}
            setShowInvoice={setShowInvoice}
            personsBalance={{
              ...item?.sellers,
              total: item?.sellers?.total - ingoing_purchase,
            }}
            TotalBalanceWithoutMinus={true}
          />
        </div>
      )}
      <Modal>
        <Dropdown
          openIcon={<HiEllipsisVertical />}
          className=""
          title="دەسکاری کردنی کاڵا"
        >
          <MenuItem>
            {isAdmin && (
              <DropdownItem>
                <Modal.Open opens="edit">
                  <ButtonIconText
                    className={'w-60'}
                    icon={<HiPencil />}
                    text="دەستکاری کردن"
                  />
                </Modal.Open>
              </DropdownItem>
            )}
            {isAdmin && (
              <DropdownItem>
                <Modal.Open opens="delete">
                  <ButtonIconText
                    className={'w-60'}
                    icon={<HiTrash />}
                    text="سڕینەوە"
                  />
                </Modal.Open>
              </DropdownItem>
            )}
            {isAdmin && (
              <DropdownItem>
                <Modal.Open opens="reminder">
                  <ButtonIconText
                    className={'w-60'}
                    icon={<LuCalendarDays />}
                    text="بیرخەرەوە"
                  />
                </Modal.Open>
              </DropdownItem>
            )}

            <DropdownItem>
              <Modal.Open opens="details">
                <ButtonIconText
                  className={'w-60'}
                  icon={<HiEllipsisHorizontalCircle />}
                  text="وردبینی"
                />
              </Modal.Open>
            </DropdownItem>

            <DropdownItem>
              <Modal.Open opens="openLang">
                <ButtonIconText
                  className={'w-60'}
                  icon={<FaFileDownload />}
                  text="پرینت"
                />
              </Modal.Open>
            </DropdownItem>
          </MenuItem>
        </Dropdown>

        <Modal.Window name="edit">
          <EditTransaction
            transactionItamId={transactionItamId}
            transaction_date={transaction_date}
            ingoing_purchase={ingoing_purchase}
            outgoing_purchase={outgoing_purchase}
            note={note}
            inventory_receipt={inventory_receipt}
          />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={inventory_receipt}
            disabled={isDeleting}
            onConfirm={() => deleteTransactionItem(transactionItamId)}
          />
        </Modal.Window>
        <Modal.Window name="details" className="w-[70%] max-w-[90rem]">
          <TransactionDetails
            transactionPurchese={transactionPurchese}
            purcheseLoading={purcheseLoading}
            purcheseCount={purcheseCount}
            transaction_date={transaction_date}
            total_purchase={ingoing_purchase - outgoing_purchase}
            note={note}
            inventory_receipt={inventory_receipt}
            sellers={sellers}
          />
        </Modal.Window>
        <Modal.Window name="reminder">
          <TransactionReminder
            transactionItamId={transactionItamId}
            returning_date={returning_date}
            returning_date_reminder={returning_date_reminder}
          />
        </Modal.Window>
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

      <p className="text-xl 2xl:text-3xl">{returning_date}</p>

      <p className="text-xl 2xl:text-3xl">
        {formatCurrency(ingoing_purchase - outgoing_purchase)}
      </p>

      <p className="text-xl 2xl:text-3xl">
        {formatCurrency(outgoing_purchase)}
      </p>
      <p className="text-xl 2xl:text-3xl">{formatCurrency(ingoing_purchase)}</p>

      <p className="text-xl 2xl:text-3xl">{inventory_receipt}</p>
      <p className="text-xl 2xl:text-3xl">{delimiter(note, 10)}</p>
      <p className="text-xl 2xl:text-3xl">
        {moment(transaction_date).format('lll')}
      </p>
    </Table.Row>
  );
}

export default TransactionRow;

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