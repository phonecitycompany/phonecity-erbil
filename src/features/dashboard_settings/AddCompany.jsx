import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import AddCompanyForm from './AddCompanyForm';

function AddCompany() {
  return (
    <Modal>
      <Modal.Open opens="addCabinForm">
        <Button>زیاد کردنی هەژمار</Button>
      </Modal.Open>

      <Modal.Window name="addCabinForm">
        <AddCompanyForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCompany;
