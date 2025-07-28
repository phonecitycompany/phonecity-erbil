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
import { useDeleteSeller } from './useDeleteSeller';
import EditSellerForm from './EditSellerForm';
function SellerRow({
    item: {
        id: seller_id,
        seller_location,
        seller_website,
        seller_email,
        seller_phone_number,
        seller_name,
    }, isAdmin
}) {

    // const { deleteTransactionItem, isDeleting } =
    //     useDeleteVaultItem(transactionItamId);
    const { isDeleting, deleteSeller } = useDeleteSeller();
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
                    <EditSellerForm
                        seller_id={seller_id}
                        seller_location={seller_location}
                        seller_website={seller_website}
                        seller_email={seller_email}
                        seller_phone_number={seller_phone_number}
                        seller_name={seller_name}
                    />
                </Modal.Window>

                <Modal.Window name="delete" >
                    <ConfirmDelete
                        resourceName={"ئەم لاینە"}
                        disabled={isDeleting}
                        onConfirm={() => deleteSeller(seller_id)}
                    />
                </Modal.Window>
            </Modal>
            <p className="text-xl 2xl:text-3xl">{seller_location}</p>
            <p className="text-xl 2xl:text-3xl">{seller_website}</p>
            <p className="text-xl 2xl:text-3xl">{seller_email}</p>
            <p className="text-xl 2xl:text-3xl">{seller_phone_number}</p>
            <p className="text-xl 2xl:text-3xl">{seller_name}</p>
        </Table.Row>
    );
}

export default SellerRow;
