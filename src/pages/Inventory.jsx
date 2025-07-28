import { useUserforButtons } from '../features/authentication/useUserForButtons';
import AddPhone from '../features/inventory/AddPhone';
import InventoryFilters from '../features/inventory/InventoryFilters';
import InventoryTable from '../features/inventory/InventoryTable';
import Header from '../ui/Header';
import Row from '../ui/Row';

function Inventory() {
  const { isAdmin } = useUserforButtons();
  return (
    <>
      <Header title="کۆگا" />

      <Row className="" type="horizontal">
        <InventoryFilters />

        <AddPhone isAdmin={isAdmin} />
      </Row>
      <InventoryTable isAdmin={isAdmin} />

    </>
  );
}

export default Inventory;
