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
import { useDeleteCompany } from './useDeleteCompany';
import EditCompanyForm from './EditCompanyForm';
import { is } from 'date-fns/locale';
function CompanyRow({
    item: {
        id: company_id,
        company_location,
        company_website,
        company_email,
        company_phone_number,
        company_name,
    }, isAdmin
}) {

    // const { deleteTransactionItem, isDeleting } =
    //     useDeleteVaultItem(transactionItamId);
    const { isDeleting, deleteCompany } = useDeleteCompany();
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
                    {/* <EditVaultForm deposit={deposit} withdrawal={withdrawal} transactionItamId={transactionItamId} /> */}
                    <EditCompanyForm
                        companyId={company_id}
                        companyLocation={company_location}
                        companyWebsite={company_website}
                        companyEmail={company_email}
                        companyPhoneNumber={company_phone_number}
                        companyName={company_name}
                    />
                </Modal.Window>

                <Modal.Window name="delete" >
                    <ConfirmDelete
                        resourceName={"ئەم لاینە"}
                        disabled={isDeleting}
                        onConfirm={() => deleteCompany(company_id)}
                    />
                </Modal.Window>
            </Modal>
            <p className="text-xl 2xl:text-3xl">{company_location}</p>
            <p className="text-xl 2xl:text-3xl">{company_website}</p>
            <p className="text-xl 2xl:text-3xl">{company_email}</p>
            <p className="text-xl 2xl:text-3xl">{company_phone_number}</p>
            <p className="text-xl 2xl:text-3xl">{company_name}</p>
        </Table.Row>
    );
}

export default CompanyRow;
