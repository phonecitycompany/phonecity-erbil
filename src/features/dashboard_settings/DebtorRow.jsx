import React from 'react';
// import { format } from 'date-fns';
import {
    HiEllipsisVertical,
    HiPencil,
    HiTrash,
} from 'react-icons/hi2';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import ButtonIconText from '../../ui/ButtonIconText';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteDebtor } from './useDeleteDebtor';
import EditLoanForm from './EditLoanForm';
function DebtorRow({
    item: {
        id: debtor_id,
        debtor_location,
        debtor_website,
        debtor_email,
        debtor_phone_number,
        debtor_name,
    }, isAdmin
}) {

    const { isDeleting, deleteDebtor } = useDeleteDebtor();

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

                    <EditLoanForm
                        debtor_id={debtor_id}
                        debtor_location={debtor_location}
                        debtor_website={debtor_website}
                        debtor_email={debtor_email}
                        debtor_phone_number={debtor_phone_number}
                        debtor_name={debtor_name}
                    />
                </Modal.Window>

                <Modal.Window name="delete" >
                    <ConfirmDelete
                        resourceName={"ئەم لاینە"}
                        disabled={isDeleting}
                        onConfirm={() => {
                            let id = debtor_id
                            deleteDebtor(id)
                        }}
                    />
                </Modal.Window>
            </Modal>
            <p className="text-xl 2xl:text-3xl">{debtor_location}</p>
            <p className="text-xl 2xl:text-3xl">{debtor_website}</p>
            <p className="text-xl 2xl:text-3xl">{debtor_email}</p>
            <p className="text-xl 2xl:text-3xl">{debtor_phone_number}</p>
            <p className="text-xl 2xl:text-3xl">{debtor_name}</p>
        </Table.Row>
    );
}

export default DebtorRow;
