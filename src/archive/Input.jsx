const Input = ({ className, ...rest }) => {
  return (
    <input
      className={`rounded-md border border-gray-900 bg-gray-900 px-3 py-2 transition-all duration-300 focus:border-blue-500 ${className}`}
      {...rest}
    />
  );
};

export default Input;
