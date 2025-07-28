// import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
// import SortBy from '../../ui/SortBy';

import { useState } from 'react';

function UserType({
    userTypeArray,
    accountType, setAccountType,
}) {
    const [open, setOpen] = useState(false);


    return (
        <div className="relative flex flex-col">
            <div className="text-right text-xl mb-2.5">جۆری بەکارهێنەر</div>
            <div
                onClick={() => {
                    setOpen(!open);
                }}
                className="input rtl flex w-full cursor-pointer flex-row items-center justify-between  h-16"
            >
                <p className="">{accountType.label}</p>
                <IoIosArrowDropdownCircle className={` text-3xl transition ${open && 'rotate-180'}`} />
            </div>
            {open === true && (
                <div className="absolute top-full mt-2 max-h-96 w-full z-10 overflow-y-scroll rounded-xl border-2 bg-white p-6 shadow-md">
                    {userTypeArray?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    setOpen(false);
                                    setAccountType(item);
                                }}
                                className="cursor-pointer rounded-lg p-4 text-3xl hover:bg-gray-100 "
                            >
                                {item?.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default UserType;
