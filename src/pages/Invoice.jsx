import React from 'react';
import { useState } from 'react';
import Companies from '../../public/images/comp_invo.png';
import GetMoney from '../../public/images/get_money.png';
import SellInvo from '../../public/images/sell_invo.png';
import CompanyForm from '../features/invoice/CompanyForm';
import GetMoneyForm from '../features/invoice/GetMoneyForm';
import SellInvoiceForm from '../features/invoice/SellInvoiceForm';



export default function Invoice() {
  const [invoice, setInvoice] = useState();

  return (
    <>
    <div className="flex flex-row justify-between">
      <div onClick={()=>{setInvoice("compines")}} className={`w-[32%] flex flex-col justify-center items-center gap-6 rounded-xl cursor-pointer `}>
        <img className={` ${invoice==="compines"?" border-[1px] lg:border-2":"border-0 lg:border-0"} rounded-xl border-main-light cursor-pointer p-1 xl:p-4`} src={Companies} alt="compines"  />
        <h1 className='text-sm xl:text-xl 2xl:text-3xl'>کۆمپانیاکان</h1>
      </div>
      <div onClick={()=>{setInvoice("getmoney")}} className={`w-[32%] flex flex-col justify-center items-center gap-6  rounded-xl cursor-pointer `}>
        <img className={` ${invoice==="getmoney"?" border-[1px] lg:border-2":"border-0 lg:border-0"} rounded-xl border-main-light cursor-pointer p-1 xl:p-4`} src={GetMoney} alt="getmoney"  />
        <h1 className='text-sm xl:text-xl 2xl:text-3xl'>وەصڵی پارە وەرگرتن</h1>
      </div>
      <div onClick={()=>{setInvoice("sellinvoice")}} className={`w-[32%] flex flex-col justify-center items-center gap-6  rounded-xl cursor-pointer `}>
        <img className={` ${invoice==="sellinvoice"?" border-[1px] lg:border-2":"border-0 lg:border-0"} rounded-xl border-main-light cursor-pointer p-1 xl:p-4`} src={SellInvo} alt="sellinvoice"  />
        <h1 className='text-sm xl:text-xl 2xl:text-3xl'>وەصڵی فرۆشتن</h1>
      </div>
    </div>

    <div>
      {invoice==="compines" && <CompanyForm/>}
      {invoice==="getmoney" && <GetMoneyForm/>}
      {invoice==="sellinvoice" && <SellInvoiceForm/>}
    </div>
    
    </>
  );
}
