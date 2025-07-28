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
import { formatCurrency, delimiter } from '../../utils/helpers';
import ButtonIconText from '../../ui/ButtonIconText';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteTransactionItem } from './useDeleteTransactionItem';
import LoanDetails from './LoanDetails';
import EditTransactionForm from './EditTransactionForm';
import TransactionReminder from './TransactionReminder';
import moment from 'moment';
function TransactionRow({
  item: {
    id: transactionItamId,
    transaction_date,
    ingoing_purchase,
    outgoing_purchase,
    total_purchase,
    note,
    returning_date,
    returning_date_reminder,
    debtor,
  },
  isAdmin,
}) {
  // const { checkout, isCheckingOut } = useCheckout();
  const { deleteTransactionItem, isDeleting } =
    useDeleteTransactionItem(transactionItamId);

  return (
    <Table.Row className="border-t border-gray-200">
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
          </MenuItem>
        </Dropdown>

        <Modal.Window name="edit">
          <EditTransactionForm
            transactionId={transactionItamId}
            transaction_date={transaction_date}
            ingoing_purchase={ingoing_purchase}
            outgoing_purchase={outgoing_purchase}
          />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={'ئەم لاینە'}
            disabled={isDeleting}
            onConfirm={() => deleteTransactionItem(transactionItamId)}
          />
        </Modal.Window>
        <Modal.Window name="details" className="w-[70%] max-w-[90rem]">
          <LoanDetails
            debtor={debtor}
            note={note}
            transaction_date={transaction_date}
            returning_date={returning_date}
            outgoing_purchase={outgoing_purchase}
            ingoing_purchase={ingoing_purchase}
          />
        </Modal.Window>
        <Modal.Window name="reminder">
          <TransactionReminder
            transactionItamId={transactionItamId}
            returning_date={returning_date}
            returning_date_reminder={returning_date_reminder}
          />
        </Modal.Window>
      </Modal>

      <p className="text-xl 2xl:text-3xl">{returning_date}</p>
      <p className="text-xl 2xl:text-3xl">{delimiter(note, 10)}</p>
      <p className="text-xl 2xl:text-3xl">
        {formatCurrency(outgoing_purchase)}
      </p>
      <p className="text-xl 2xl:text-3xl">{formatCurrency(ingoing_purchase)}</p>

      {/* <p className='text-xl 2xl:text-3xl'>{formatCurrency(total_purchase)}</p> */}

      <p className="text-xl 2xl:text-3xl">
        {moment(transaction_date).format('lll')}
      </p>
    </Table.Row>
  );
}

export default TransactionRow;