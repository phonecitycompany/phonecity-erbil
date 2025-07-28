import {
  HiChartPie,
  HiDocumentText,
  HiUserGroup,
  HiBuildingOffice2,
  HiMiniBanknotes,
  HiMiniPresentationChartLine,
  HiDevicePhoneMobile,
  HiMiniCog6Tooth,
} from 'react-icons/hi2';
import NavButton from './NavButton';

function MainNav() {
  return (
    <nav className="flex w-full flex-col items-center">
      <ul className="mt-10  2xl:mt-16 flex flex-col gap-5 2xl:gap-8">
        <li>
          <NavButton to="/dashboard">
            <HiChartPie />
          </NavButton>
        </li>

        <li>
          <NavButton to="/receipt">
            <HiDocumentText />
          </NavButton>
        </li>

        <li>
          <NavButton to="/sellers">
            <HiUserGroup />
          </NavButton>
        </li>

        <li>
          <NavButton to="/companies">
            <HiBuildingOffice2 />
          </NavButton>
        </li>

        <li>
          <NavButton to="/loans">
            <HiMiniBanknotes />
          </NavButton>
        </li>

        <li>
          <NavButton to="/ownership">
            <HiMiniPresentationChartLine />
          </NavButton>
        </li>

        <li>
          <NavButton to="/Inventory">
            <HiDevicePhoneMobile />
          </NavButton>
        </li>

        <li>
          <NavButton to="/settings">
            <HiMiniCog6Tooth />
          </NavButton>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
