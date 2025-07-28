import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import AddLoansForm from './AddLoansForm';
// import AddItem from '../../ui/AddItem';

function AddLoans() {
    return (
        <Modal>
            <Modal.Open opens="addCabinForm">
                <Button className="text-base xl:text-xl 2xl:text-2xl 2xl:px-5 px-3" >زیاد کردنی وەرگر</Button>
            </Modal.Open>

            <Modal.Window name="addCabinForm">
                <AddLoansForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddLoans;
