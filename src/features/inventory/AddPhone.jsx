import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
// import AddItem from '../../ui/AddItem';
import AddEditPhoneForm from './AddEditPhoneForm';

function AddPhone({ isAdmin }) {

  return (
    <Modal>
      {isAdmin && <Modal.Open opens="addCabinForm">
        <Button>زیادکردنی کاڵای نوێ</Button>
      </Modal.Open>}


      <Modal.Window name="addCabinForm">
        <AddEditPhoneForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddPhone;
