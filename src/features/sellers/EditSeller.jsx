import Button from '../../ui/Button';
// import Heading from '../../ui/Heading';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useAddSeller';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';
import { useSellerItem } from './useSellerItem';
import Modal from '../../ui/Modal';
import { useEditSellerItem } from './useEditSellerItem';
// import { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EditSellerForm from './EditSellerForm';
function EditItem({ isLoading, arrayOfSellers, sellerid }) {
  return (
    <>
      <Modal>
        <Modal.Open opens="editCabin">
          <Button className="text-base xl:text-xl 2xl:text-2xl 2xl:px-5 px-3">دەستکاریکردن</Button>
        </Modal.Open>

        <Modal.Window name="editCabin">
          <EditSellerForm
            isLoading={isLoading}
            arrayOfSellers={arrayOfSellers}
            sellerid={sellerid}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default EditItem;
