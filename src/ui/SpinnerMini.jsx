import { BiLoaderAlt } from 'react-icons/bi';

const SpinnerMini = () => {
  return (
    <div className="inline-block animate-spin">
      <BiLoaderAlt className="h-6 w-6" />
    </div>
  );
};

export default SpinnerMini;
