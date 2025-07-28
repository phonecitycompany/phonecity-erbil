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
import { useDeleteVaultItem } from './useDeleteVaultItem';
import EditVaultForm from './EditVaultForm';
// import EditTransactionForm from './EditTransactionForm';
// import TransactionReminder from './TransactionReminder';
function VaultRow({
    item: {
        id: transactionItamId,
        transaction_date,
        deposit,
        total_purchase,
        note,
        withdrawal,
    }, isAdmin
}) {
    // const { checkout, isCheckingOut } = useCheckout();
    const { deleteTransactionItem, isDeleting } =
        useDeleteVaultItem(transactionItamId);

    return (
        <Table.Row className="border-t border-gray-200">
            <Modal>
                <Dropdown
                    openIcon={<HiEllipsisVertical />}
                    className=""
                    title="دەسکاری کردنی کاڵا"
                >
                    <MenuItem>
                        {isAdmin && <DropdownItem>
                            <Modal.Open opens="edit">
                                <ButtonIconText
                                    className={'w-60'}
                                    icon={<HiPencil />}
                                    text="دەستکاری کردن"
                                />
                            </Modal.Open>
                        </DropdownItem>}
                        {isAdmin && <DropdownItem>
                            <Modal.Open opens="delete">
                                <ButtonIconText
                                    className={'w-60'}
                                    icon={<HiTrash />}
                                    text="سڕینەوە"
                                />
                            </Modal.Open>
                        </DropdownItem>}


                    </MenuItem>
                </Dropdown>

                <Modal.Window name="edit">
                    <EditVaultForm deposit={deposit} withdrawal={withdrawal} transactionItamId={transactionItamId} />
                </Modal.Window>

                <Modal.Window name="delete" >
                    <ConfirmDelete
                        resourceName={"ئەم لاینە"}
                        disabled={isDeleting}
                        onConfirm={() => deleteTransactionItem(transactionItamId)}
                    />
                </Modal.Window>
            </Modal>
            <p className='text-xl 2xl:text-3xl'>{delimiter(note, 10)}</p>
            <p className='text-xl 2xl:text-3xl'>{formatCurrency(withdrawal)}</p>
            <p className='text-xl 2xl:text-3xl'>{formatCurrency(deposit)}</p>

            <p className='text-xl 2xl:text-3xl'>{transaction_date}</p>
        </Table.Row>
    );
}

export default VaultRow;
