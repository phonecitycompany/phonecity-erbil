const RadioOption = ({ name, filterState, value, label, onChange }) => {
  const isChecked = value === filterState;

  return (
    <label className="flex gap-3">
      <span className="ml-2">{label}</span>
      <input
        type="radio"
        className="radio !my-auto"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => onChange(value)}
      />
    </label>
  );
};

const RadioGroup = ({ filterState, setFilterState, name, options ,className }) => {
  const handleChange = value => {
    setFilterState(value);
  };

  return (
    <div className={`flex flex-col items-end gap-2 ${className} `}>
      {options.map(option => (
        <RadioOption
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          onChange={handleChange}
          filterState={filterState}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
