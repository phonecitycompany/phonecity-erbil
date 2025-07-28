import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import Modal from '../../ui/Modal';
import WithdrowMoneyForm from './WithdrowMoneyForm';
import DepositMoneyForm from './DepositMoneyForm';
import { IoIosCloseCircle } from 'react-icons/io';
import SingleInvoice from '../../pages/SingleInvoice';
import { useState } from 'react';
import SortBy from '../../ui/SortBy';
import DateFilter from '../../ui/DateFilter';
import FromToDateFilter from '../../ui/FromToDateFilter';
import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import ResetFilter from '../../ui/ResetFillter';
import { useGetPartners } from '../ownership/useGetPartners';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteAllVaultItem } from './useDeleteAllVault';

export default function VaultTotal({
  isLoading,
  transactionItems,
  isAdmin,
  totalforfilter,
}) {
  const [showInvoice, setShowInvoice] = useState(false);
  const {
    partnersData,
    isLoading: isPartnersLoading,
    count,
  } = useGetPartners();
  const { isDeleting, deleteTransactionItem } = useDeleteAllVaultItem();
  if (isLoading) return <Spinner />;

  const totalForshow = totalforfilter?.reduce(
    (total, item) => total + item.total,
    0,
  );

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
          <SingleInvoice type="boxinvo" data={transactionItems} />
        </div>
      )}
      <div className="mt-5">
        <div className="flex justify-end">
          <div className="flex flex-row-reverse flex-wrap items-center gap-5">
            <div className="input flex  w-[30rem] justify-between ">
              <div className="">
                {formatCurrency(
                  totalForshow +
                    partnersData?.reduce((accumulator, current) => {
                      return (accumulator += current?.total);
                    }, 0),
                )}
              </div>
              <div className="">کۆی گشتی پارەی ناو سندوق</div>
            </div>
            <Dropdown openButton="پاڵفتە کردن" className="" title="شریکە">
              <MenuItem>
                <DropdownItem>
                  <SortBy
                    options={[
                      {
                        value: 'outLowToHigh',
                        label: 'کەمترین پارەی دەرهێنراو لە سندوق',
                      },
                      {
                        value: 'outHighToLow',
                        label: 'زۆرترین پارەی دەرهێنراو لە سندوق',
                      },
                      {
                        value: 'ingoingHighToLow',
                        label: 'زۆرترین پارەی زیادکراو بۆ ناو سندوق',
                      },
                      {
                        value: 'ingoingLowToHigh',
                        label: 'کەمترین پارەی زیادکراو بۆ ناو سندوق',
                      },
                    ]}
                  />
                </DropdownItem>
                <DropdownItem>
                  <DateFilter className2="!p-3 !text-2xl " />
                </DropdownItem>
                <DropdownItem>
                  <FromToDateFilter className2="!p-3 !text-2xl " />
                </DropdownItem>
              </MenuItem>
              <ResetFilter className="mt-2" />
            </Dropdown>
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
                <Modal.Open opens="withdrowForm">
                  <Button type="button" variation="confirm" className="">
                    دەرهێنان
                  </Button>
                </Modal.Open>
              )}
              {isAdmin && (
                <Modal.Open opens="depositForm">
                  <Button type="button" variation="confirm" className="">
                    زیاد کردن
                  </Button>
                </Modal.Open>
              )}
              {isAdmin && (
                <Modal.Open opens="clear">
                  <Button type="button" variation="confirm" className="">
                    سفر کردنەوەی سندوق
                  </Button>
                </Modal.Open>
              )}
              <Modal.Window name="withdrowForm">
                <WithdrowMoneyForm />
              </Modal.Window>
              <Modal.Window name="depositForm">
                <DepositMoneyForm />
              </Modal.Window>
              <Modal.Window name="clear">
                <ConfirmDelete
                  resourceName={'هەموو داتاکان و کردنی بە یەک داتا'}
                  disabled={isDeleting}
                  onConfirm={() =>
                    deleteTransactionItem({
                      newItem: {
                        withdrawal: totalForshow < 0 ? totalForshow : 0,
                        deposit: totalForshow >= 0 ? totalForshow : 0,
                        note: 'سفر کردنەوەی سندوق',
                        total: totalForshow,
                      },
                      old: totalforfilter?.map(item => {
                        return item.id;
                      }),
                    })
                  }
                />
              </Modal.Window>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}