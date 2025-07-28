import { HiMiniArrowUpOnSquare } from 'react-icons/hi2';

import { useLogout } from './useLogout';

import SpinnerMini from '../../ui/SpinnerMini';

function Logout({ className }) {
  const { logout, isLoading } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <button
      className={`text-light-grey hover:bg-main-transparent  rounded-md border-r-4 border-r-white py-5 pl-[12.5px]  pr-[10px] text-4xl transition-all duration-100 ease-in-out  hover:border-r-transparent   
        ${className}`}
      onClick={handleLogout}
    >
      {!isLoading ? <HiMiniArrowUpOnSquare /> : <SpinnerMini />}
    </button>
  );
}

export default Logout;
