const Form = ({ type = 'regular', className, children, ...rest }) => {
  const regularClasses = 'p-10 overflow-hidden rounded-md  text-sm';
  const modalClasses = 'w-96';

  return (
    <form
      className={`${
        type === 'regular' ? regularClasses : modalClasses
      }  ${className}`}
      {...rest}
    >
      {children}
    </form>
  );
};

export default Form;
