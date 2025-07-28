function FormRowVertical({ label, error,className,classNameError, children, ...rest }) {
  return (
    <div className={`rtl flex flex-col gap-2 py-3 ${className} `} {...rest}>
      {label && (
        <label
          className="font-font-normal  text-xl"
          htmlFor={children.props.id}
        >
          {label}
        </label>
      )}

      {children}

      {error && <span className={`text-base text-red-dark ${classNameError}`}>{error}</span>}
    </div>
  );
}

export default FormRowVertical;
