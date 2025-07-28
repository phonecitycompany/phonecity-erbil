import Button from '../ui/Button';
import Heading from '../ui/Heading';

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex w-96 flex-col gap-3 rounded-lg bg-white p-6 shadow-lg">
      <Heading as="h3" className="text-lg font-medium">
        Delete {resourceName}
      </Heading>
      <p className="text-sm text-gray-500">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-600"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
