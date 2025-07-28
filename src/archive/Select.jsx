function Select({ options, value, onChange, ...props }) {
  return (
    <select
      className={`border px-4 py-2 text-base font-medium ${
        props.type === 'white' ? 'border-gray-300' : 'border-gray-500'
      } rounded-md bg-gray-100 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
export default Select;
