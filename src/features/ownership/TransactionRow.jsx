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
import { useDeleteTransaction } from './useDeleteTransaction';
import EditMoneyFormTransaction from './EditMoneyFormTransaction';
function TransactionRow({
    item: {
        id: transactionItamId,
        transaction_date,
        deposit,
        withdrawal,
        total,
        note,
    }, partnerId
}) {
    const { isDeleting, deleteTransactionItem } = useDeleteTransaction(transactionItamId);

    return (
        <Table.Row className="border-t border-gray-200">
            <Modal>
                <Dropdown
                    openIcon={<HiEllipsisVertical />}
                    className=""
                    title="دەسکاری کردنی کاڵا"
                >
                    <MenuItem>
                        <DropdownItem>
                            <Modal.Open opens="edit">
                                <ButtonIconText
                                    className={'w-60'}
                                    icon={<HiPencil />}
                                    text="دەستکاری کردن"
                                />
                            </Modal.Open>
                        </DropdownItem>

                        <DropdownItem>
                            <Modal.Open opens="delete">
                                <ButtonIconText
                                    className={'w-60'}
                                    icon={<HiTrash />}
                                    text="سڕینەوە"
                                />
                            </Modal.Open>
                        </DropdownItem>

                    </MenuItem>
                </Dropdown>

                <Modal.Window name="edit">
                    <EditMoneyFormTransaction transactionItamId={transactionItamId}
                        transaction_date={transaction_date}
                        deposit={deposit}
                        withdrawal={withdrawal}
                        partnerId={partnerId}
                        note={note} />
                </Modal.Window>

                <Modal.Window name="delete" >
                    <ConfirmDelete
                        resourceName={"ئەم لاینە"}
                        disabled={isDeleting}
                        onConfirm={() => deleteTransactionItem(transactionItamId)}
                    />
                </Modal.Window>

            </Modal>
            <p className='text-xl 2xl:text-3xl'>{formatCurrency(deposit)}</p>
            <p className='text-xl 2xl:text-3xl'>{formatCurrency(withdrawal)}</p>
            <p className='text-xl 2xl:text-3xl'>{delimiter(note, 10)}</p>
            <p className='text-xl 2xl:text-3xl'>{transaction_date}</p>
        </Table.Row>
    );
}

export default TransactionRow;
