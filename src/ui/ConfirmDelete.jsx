import Button from './Button';
import Heading from './Heading';

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex min-w-[40rem] flex-col text-center">
      <Heading as="h3">سڕینەوەی {resourceName}</Heading>
      <p className=" mt-2 text-gray-500">دڵنیایت لە سڕینەوەی {resourceName}</p>

      <div className="mt-14 flex justify-center gap-5">
        <Button
          variation="confirm"
          disabled={disabled}
          onClick={onCloseModal}
          className="bg-gray-200 text-gray-700"
        >
          پەشیمانبونەوە
        </Button>

        <Button
          variation="discard"
          disabled={disabled}
          onClick={onConfirm}
          className="bg-red-500 text-white"
        >
          سڕینەوە
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
