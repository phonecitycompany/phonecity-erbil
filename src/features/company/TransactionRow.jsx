import React from 'react';
// import { format } from 'date-fns';
import {
  HiEllipsisHorizontalCircle,
  HiEllipsisVertical,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2';
import { FaChevronDown, FaFileDownload } from 'react-icons/fa';
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
import TransactionReminder from './TransactionReminder';
import EditTransaction from './EditTransaction';
import TransactionNote from './TransactionNote';
import { useState } from 'react';
import SingleInvoice from '../../pages/SingleInvoice';
import { IoIosArrowDropdownCircle, IoIosCloseCircle } from 'react-icons/io';
import Button from '../../ui/Button';
import moment from 'moment';
function TransactionRow({
  item: {
    id: transactionItamId,
    transaction_date,
    ingoing_purchase,
    outgoing_purchase,
    total_purchase,
    sold_item_quantity,
    note,
    returning_date,
    inventory_receipt,
    returning_date_reminder,
  },
  companyItem,
  companyId,
  isAdmin,
  item,
}) {
  // const { checkout, isCheckingOut } = useCheckout();
  const { deleteTransactionItem, isDeleting } =
    useDeleteTransactionItem(transactionItamId);
  const [companyData, setCompanyData] = useState();
  const [printData, setPrintData] = useState({});
  const [lang, setLang] = useState(null);
  const [money, setMoney] = useState(null);
  const [langDrop, setLangDrop] = useState(false);
  const [moneyDrop, setMoneyDrop] = useState(false);
  const [langPlaceholder, setLangPlaceHolder] = useState('زمان هەڵبژێرە');
  const [moneyPlaceholder, setMoneyPlaceHolder] =
    useState('جۆری دراو هەڵبژێرە');
  const [showInvoice, setShowInvoice] = useState(false);
  let currentCompany = companyItem?.find(seller => seller.id == companyId);
  let data = {
    money_number: ingoing_purchase,
    company_name: currentCompany?.company_name,
    reminder_date: returning_date_reminder,
    note: note,
    invoice_number: transactionItamId,
    total_money: outgoing_purchase,
    date: moment(transaction_date).format('lll'),
  };

  return (
    <div className="">
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
            data={data}
            setLang={setLang}
            setMoney={setMoney}
            setShowInvoice={setShowInvoice}
            personsBalance={{
              ...currentCompany,
              total:
                currentCompany?.total + (outgoing_purchase - ingoing_purchase),
            }}
          />
        </div>
      )}
      <Table.Row className="relative border-t border-gray-200">
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
                <Modal.Open opens="note">
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

          <Modal.Window name="reminder">
            <TransactionReminder
              transactionItamId={transactionItamId}
              returning_date={returning_date}
              returning_date_reminder={returning_date_reminder}
            />
          </Modal.Window>
          <Modal.Window name="note">
            <TransactionNote
              returning_date={returning_date}
              inventory_receipt={inventory_receipt}
              outgoing_purchase={outgoing_purchase}
              ingoing_purchase={ingoing_purchase}
              total_purchase={ingoing_purchase - outgoing_purchase}
              companyId={companyId}
              companyItem={companyItem}
              note={note}
            />
          </Modal.Window>
        </Modal>

        <p>{returning_date}</p>

        <p>{formatCurrency(ingoing_purchase - outgoing_purchase)}</p>
        <p>{formatCurrency(outgoing_purchase)}</p>
        <p>{formatCurrency(ingoing_purchase)}</p>
        <p>{inventory_receipt}</p>
        <p>{delimiter(note, 15)}</p>
        <p>{moment(transaction_date).format('lll')}</p>
      </Table.Row>
    </div>
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