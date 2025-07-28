import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoGlobeOutline } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import Modal from '../../ui/Modal';
import AddTransactionForm from './AddTransactionForm';
import GetMoneyBack from './GetMoneyBack';
import { IoIosCloseCircle } from 'react-icons/io';
import SingleInvoice from '../../pages/SingleInvoice';
import { useState } from 'react';
import { PAGE_SIZE } from '../../utils/constants';
import { useSearchParams } from 'react-router-dom';
export default function LoanTotal({
  loansItem,
  loanId,
  isLoading,
  transactionItems,
  isAdmin,
  totalforfilter,
  totalforfilterloading,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showInvoice, setShowInvoice] = useState(false);
  if (isLoading) return <Spinner />;
  const values = loansItem?.find(loan => loan.id == loanId);
  if (!values) {
    return;
  }
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
      {showInvoice && (
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gray-100">
          <div className="rtl  p-7">
            <IoIosCloseCircle
              onClick={() => {
                setShowInvoice(false);
              }}
              className="cursor-pointer text-7xl text-main"
            />
          </div>
          <SingleInvoice
            type="getdebtinvo"
            data={transactionItems}
            allCombinedData={reverseArr(totalforfilter)}
            setShowInvoice={setShowInvoice}
            startAt={totalforfilter
              .slice(0, ((searchParams.get('page') || 1) - 1) * PAGE_SIZE)
              .reduce(
                (total, item) =>
                  total + (item.ingoing_purchase - item.outgoing_purchase),
                0,
              )}
          />
        </div>
      )}
      <div className="mt-5">
        <div className="flex justify-end">
          <div className="flex flex-row-reverse flex-wrap items-center gap-5">
            <div className="input flex w-[17rem] justify-between lg:w-[30rem] ">
              <div className="">{formatCurrency(totalForshow)}</div>
              <div className="">کۆی گشتی</div>
            </div>
            <Button
              type="button"
              variation="confirm"
              disabled={isLoading}
              onClick={() => {
                setShowInvoice(true);
              }}
              className=""
            >
              کەشف حساب
            </Button>
            <Modal>
              {isAdmin && (
                <Modal.Open opens="addTransaction">
                  <Button type="button" variation="confirm" className="">
                    قەرز کردن
                  </Button>
                </Modal.Open>
              )}
              {isAdmin && (
                <Modal.Open opens="getMoneyback">
                  <Button type="button" variation="confirm" className="">
                    هێنانەوەی پارە
                  </Button>
                </Modal.Open>
              )}

              <Modal.Window name="addTransaction">
                <AddTransactionForm debtorId={loanId} />
              </Modal.Window>
              <Modal.Window name="getMoneyback">
                <GetMoneyBack debtorId={loanId} />
              </Modal.Window>
            </Modal>
          </div>
        </div>
        {values && (
          <div className="input mt-5 flex w-full flex-col space-y-8 !p-5">
            <div className="relative z-0 flex justify-between">
              <div className="flex items-center space-x-2 text-xl font-bold">
                <span className="text-2xl text-main">
                  <MdEmail />
                </span>
                <span>{values?.debtor_email}</span>
              </div>

              <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-black"></div>
              <div className="flex items-center space-x-2 text-xl font-bold">
                <span>{values?.debtor_location}</span>
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
                <span>{values?.debtor_phone_number}</span>
              </div>
              <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-black"></div>
              <div className="flex items-center space-x-2 text-xl font-bold">
                <span>{values?.debtor_website}</span>
                <span className="text-2xl text-main">
                  <IoGlobeOutline />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
