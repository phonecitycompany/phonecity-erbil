import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
export default function TransactionNote({
    returning_date,
    inventory_receipt,
    outgoing_purchase,
    ingoing_purchase,
    total_purchase,
    companyId,
    companyItem,
    transaction_date,
    note,
    onCloseModal
}) {
    let currentCompany = companyItem?.find(seller => seller.id == companyId);

    return (
        <div className='w-[60rem]'>
            <div className="flex">

                <div className="flex w-[280px] flex-col flex-1">
                    <p className="">تێبینی : </p>
                    <p className="">{note}</p>
                </div>
                <div className="my-auto h-36  w-1 bg-slate-300 ml-10"></div>
                <div className="flex flex-col gap-3 flex-1">
                    <div className="rtl flex flex-col gap-x-10 flex-wrap gap-y-3">
                        <div className='flex-shrink-0'>ناوی کۆمپانیا : {currentCompany?.company_name}</div>
                        <div className='flex-shrink-0'>ژمارەی وەصڵ : {inventory_receipt}</div>

                    </div>
                    <div className="rtl flex flex-col gap-x-10 flex-wrap gap-y-3 ">
                        <div>کۆی گشتی پارە : {formatCurrency(ingoing_purchase)} </div>
                    </div>

                </div>

            </div>
            <div className="mt-5 flex items-center relative border-t pt-5 pb-2 border-slate-300">

                <div className='flex-1 px-5 border-r-2 flex justify-center items-center'>
                    <div className="">کاتی بردنەوە</div>
                </div>
                <div className='flex-1 px-5 border-r-2 flex justify-center items-center'>
                    <div className="">دەرئەنجام</div>
                </div>
                <div className='flex-1 px-5 border-r-2 flex justify-center items-center'>
                    <div className="">پارەی ڕۆشتوو</div>
                </div>
                <div className='flex-1 px-5 flex justify-center items-center'>
                    <div className="">بەروار</div>
                </div>


            </div>
            <div className="mt-5 flex items-center relative border-y py-5 border-slate-300">

                <div className='flex-1 px-5 border-r-2 flex justify-center items-center'>
                    <div className="">{returning_date}</div>
                </div>


                <div className='flex-1 px-5 border-r-2 flex justify-center items-center'>
                    <div className="">{formatCurrency(total_purchase)}</div>
                </div>
                <div className='flex-1 px-5 border-r-2 flex justify-center items-center'>
                    <div className="">{formatCurrency(ingoing_purchase)}</div>
                </div>
                <div className='flex-1  px-5  flex justify-center items-center'>
                    <div className="">
                        {returning_date}
                    </div>

                </div>

            </div>



            <div className="flex justify-end mt-10">
                <Button
                    variation="confirm"
                    onClick={onCloseModal}
                    className="bg-gray-200 text-gray-700"
                >
                    پەشیمانبونەوە
                </Button>
            </div>
        </div>
    );
}
