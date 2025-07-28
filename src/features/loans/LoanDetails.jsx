import Table from "../../ui/Table"
import { formatCurrency, delimiter } from "../../utils/helpers"
export default function LoanDetails({ debtor, note, returning_date, outgoing_purchase, ingoing_purchase, transaction_date }) {
    return <div className="w-full ">
        <div className="flex flex-row text-right justify-end">
            <div className="flex-1">
                <div className="">{note}</div>
            </div>
            <div className="h-20 lg:mx-2 w-1 bg-[#e5e7eb] mt-8 mb-12 !mx-8 flex-shrink-0"></div>
            <div className="flex flex-1 justify-end">
                <span className="mr-2">{debtor?.debtor_name}</span>
                <span className="">:</span>
                <span className="">ناوی وەرگر  </span>
            </div>
        </div>
        <div className="flex justify-end">
            <div className="divide-y-2 flex flex-col justify-end w-full">
                <div className=""></div>
                <div className="divide-x-2 flex flex-row items-center py-6">
                    <div className="flex-1 text-center">کاتی هێنانەوە</div>
                    <div className="flex-1 text-center">بڕی پارەی گەڕێندراوە</div>
                    <div className="flex-1 text-center">بڕی پارەی قەرز</div>
                    <div className="flex-1 text-center">بەروار</div>
                </div>
                <div className="divide-x-2 flex flex-row items-center py-6">
                    <div className="flex-1 text-center">{returning_date}</div>
                    <div className="flex-1 text-center">{formatCurrency(outgoing_purchase)}</div>
                    <div className="flex-1 text-center">{formatCurrency(ingoing_purchase)}</div>
                    <div className="flex-1 text-center">{transaction_date}</div>
                </div>

                <div className=""></div>
            </div>
        </div>
    </div>
}