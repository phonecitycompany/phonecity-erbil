import { Outlet } from 'react-router-dom';
import NotificationsSidebar from '../features/notifications/NotificationsSidebar';
import Sidebar from './SideBar';
import Logo from './Logo';
import MainNav from './MainNav';
import Logout from '../features/authentication/logout';
import ResetFillter from './ResetFillter';

function AppLayout() {
  return (
    <div className="grid max-h-screen min-h-screen grid-cols-[1fr_90px] grid-rows-1  overflow-y-scroll  lg:grid-cols-[1fr_115px]">
      {/* <Sidebar className="w-[24rem] lg:w-[28rem]">
        <NotificationsSidebar />
      </Sidebar> */}

      <main className=" my-5 overflow-x-hidden overflow-y-scroll p-3 lg:p-10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8">
          <Outlet />
        </div>
      </main>

      <Sidebar className="items-center p-0" asideClass="py-5 px-4">
        <Logo />

        <MainNav />

        <Logout className="mt-auto" />
      </Sidebar>
    </div>
  );
}

export default AppLayout;
