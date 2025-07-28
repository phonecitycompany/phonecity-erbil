import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
// import AddItem from '../../ui/AddItem';
import AddSellerForm from './AddSellerForm';

function AddSeller() {
  return (
    <Modal>
      <Modal.Open opens="addCabinForm">
        <Button className="text-base xl:text-xl 2xl:text-2xl 2xl:px-5 px-3" >زیادکردنی كڕیار</Button>
      </Modal.Open>

      <Modal.Window name="addCabinForm">
        <AddSellerForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddSeller;
