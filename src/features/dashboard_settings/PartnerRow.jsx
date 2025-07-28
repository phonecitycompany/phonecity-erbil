import React from 'react';
// import { format } from 'date-fns';
import { HiEllipsisVertical, HiPencil, HiTrash } from 'react-icons/hi2';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import ButtonIconText from '../../ui/ButtonIconText';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeletePartner } from './useDeletePartners';
import EditPartnerForm from './EditPartnerForm';
function PartnerRow({
  item: { id: partner_id, Withdrawal, total, Deposit, share, Partner_name }, isAdmin
}) {
  // const { deleteTransactionItem, isDeleting } =
  //     useDeleteVaultItem(transactionItamId);
  const { isDeleting, deletePartner } = useDeletePartner();
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
          <EditPartnerForm
            partnerId={partner_id}
            withdrawal={Withdrawal}
            total={total}
            deposit={Deposit}
            share={share}
            partnerName={Partner_name}
          />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={'ئەم لاینە'}
            disabled={isDeleting}
            onConfirm={() => deletePartner(partner_id)}
          />
        </Modal.Window>
      </Modal>
      <p className="text-xl 2xl:text-3xl">{total}</p>
      <p className="text-xl 2xl:text-3xl">{Deposit}</p>
      <p className="text-xl 2xl:text-3xl">{Withdrawal}</p>
      <p className="text-xl 2xl:text-3xl">{share}</p>
      <p className="text-xl 2xl:text-3xl">{Partner_name}</p>
    </Table.Row>
  );
}

export default PartnerRow;
