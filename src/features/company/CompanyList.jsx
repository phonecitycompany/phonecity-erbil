import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function CompanyList({ companyItem, companyId, setCompanyId, className }) {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (companyId) {
      searchParams.set('company', companyId);
      setSearchParams(searchParams);
    }
  }, [companyId]);

  return (
    <div className={`relative flex w-1/2 flex-col ${className}`}>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className=" rtl flex w-full cursor-pointer flex-row items-center justify-between rounded-xl bg-main p-2 hover:bg-main-dark"
      >
        <p className="text-2xl text-white">
          {companyItem?.find(seller => seller.id == companyId)?.company_name ||
            'ناوی كڕیار'}
        </p>

        <IoIosArrowDropdownCircle className="text-5xl text-white" />
      </div>
      {open === true && (
        <div className="absolute top-full z-10 mt-2 max-h-96 w-full overflow-y-scroll rounded-xl border-2 bg-white p-6 shadow-md">
          {companyItem?.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setOpen(false);
                  setCompanyId(item.id);
                  searchParams.delete('startDate');
                  searchParams.delete('endDate');
                  searchParams.delete('date');
                  searchParams.delete('sortBy');
                  searchParams.delete('seller');
                  searchParams.delete('page');
                  setSearchParams(searchParams);
                }}
                className="cursor-pointer rounded-lg p-4 text-2xl hover:bg-gray-100"
              >
                {item.company_name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CompanyList;
