import React from 'react';
// import { format } from 'date-fns';
import { HiEllipsisVertical, HiPencil, HiTrash } from 'react-icons/hi2';

import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
// import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency } from '../../utils/helpers';
import ButtonIconText from '../../ui/ButtonIconText';
import ButtonIcon from '../../ui/ButtonIcon';
import ConfirmDelete from '../../ui/ConfirmDelete';
import EditItem from './EditItem';
// import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteInventoryItem } from './useDeleteInventoryItem';
import { useEditInventoryItems } from './useEditInventoryItems';
import is from 'date-fns/esm/locale/is/index.js';
function InventoryRow({
  item: {
    id: itemId,
    item_name,
    item_quantity,
    total_sell,
    item_price,
    total_price,
  }, isAdmin
}) {
  // const { checkout, isCheckingOut } = useCheckout();
  const { deleteInventoryItem, isDeleting } = useDeleteInventoryItem();
  const { editInventoryItem, isEditting } = useEditInventoryItems();

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
                  text="دەستکاری کردنی"
                />
              </Modal.Open>
            </DropdownItem>}
            {isAdmin && <DropdownItem>
              <Modal.Open opens="delete">
                <ButtonIconText
                  className={'w-60'}
                  icon={<HiTrash />}
                  text="سڕینەوەی کاڵا"
                />
              </Modal.Open>
            </DropdownItem>}

          </MenuItem>
        </Dropdown>

        <Modal.Window name="edit">
          <EditItem
            resourceName={item_name}
            disabled={isEditting}
            itemId={itemId}
            item_quantity={item_quantity}
            item_price={item_price}
            total_sell={total_sell}
            editInventoryItem={editInventoryItem}
          />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={item_name}
            disabled={isDeleting}
            onConfirm={() => deleteInventoryItem(itemId)}
          />
        </Modal.Window>
      </Modal>

      <p>{formatCurrency(total_price)}</p>

      <p>{formatCurrency(item_price)}</p>

      <p>{total_sell}</p>

      <p>{item_quantity}</p>

      <p className='text-4xl'>{item_name}</p>
    </Table.Row>
  );
}

export default InventoryRow;
