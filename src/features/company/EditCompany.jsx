import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

import EditCompanyForm from './EditCompanyForm';
function EditCompany({ isLoading, arrayOfCompanies, companyId }) {
  return (
    <>
      <Modal>
        <Modal.Open opens="editCabin">
          <Button>دەستکاریکردن</Button>
        </Modal.Open>

        <Modal.Window name="editCabin">
          <EditCompanyForm
            isLoading={isLoading}
            arrayOfCompanies={arrayOfCompanies}
            companyId={companyId}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default EditCompany;
