import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import AddPartnerForm from './AddPartnerForm';

function AddPartner() {
    return (
        <Modal>
            <Modal.Open opens="addPartner">
                <Button>زیاد کردنی هەژمار</Button>
            </Modal.Open>

            <Modal.Window name="addPartner">
                <AddPartnerForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddPartner;
