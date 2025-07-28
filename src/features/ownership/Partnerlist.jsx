// import { Dropdown, MenuItem, DropdownItem } from '../../ui/Dropdown';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
// import SortBy from '../../ui/SortBy';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function Partnerlist({
    partnerItems,
    partnerId,
    setPartnerId,
}) {
    const [open, setOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        if (partnerId) {
            searchParams.set('partner', partnerId);
            setSearchParams(searchParams);

        }
    }, [partnerId]);


    return (
        <div className="relative flex w-1/2 flex-col">
            <div
                onClick={() => {
                    setOpen(!open);
                }}
                className=" rtl flex w-full cursor-pointer flex-row items-center justify-between rounded-xl bg-main p-3 hover:bg-main-dark"
            >
                <p className="text-white">{partnerItems?.find(partner => partner.id == partnerId)?.Partner_name}</p>
                <IoIosArrowDropdownCircle className="text-5xl text-white" />
            </div>
            {open === true && (
                <div className="absolute top-full mt-2 max-h-96 w-full z-10 overflow-y-scroll rounded-xl border-2 bg-white p-6 shadow-md">
                    {partnerItems?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    setOpen(false);
                                    setPartnerId(item.id);
                                }}
                                className="cursor-pointer rounded-lg p-4 text-3xl hover:bg-gray-100"
                            >
                                {item?.Partner_name}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Partnerlist;
