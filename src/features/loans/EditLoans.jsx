import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import EditLoanForm from './EditLoanForm';

function EditLoans({ loansItem, loanId }) {
    return (
        <>
            <Modal>
                <Modal.Open opens="editLoans">
                    <Button className="text-base xl:text-xl 2xl:text-2xl 2xl:px-5 px-3">دەستکاریکردن</Button>
                </Modal.Open>

                <Modal.Window name="editLoans">
                    <EditLoanForm loansItem={loansItem}
                        loanId={loanId}
                    />
                </Modal.Window>
            </Modal>
        </>
    );
}

export default EditLoans;
