export default function InventoryEditInhput({
  disabled,
  inputValue,
  inputText,
  setInputChange,
  inputType,
}) {
  return (
    <div className="input bg-gray mt-6 flex flex-row justify-between">
      <input
        className="w-96"
        disabled={disabled}
        type={inputType}
        defaultValue={inputValue}
        id={inputText}
        min={0}
        onChange={input => {
          setInputChange(input.target.value);
        }}
      />
      <label htmlFor={inputText} className="mt-2 cursor-pointer text-gray-500">
        {inputText}
      </label>
    </div>
  );
}
