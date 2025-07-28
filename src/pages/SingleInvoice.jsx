import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Button from '../ui/Button';
import Logo from '../../public/images/invoice.png';
import Mor from '../../public/images/mor.png';
import { usePDF } from 'react-to-pdf';
import { set } from 'date-fns';
import useSettings from '../features/settings/useSettings';
import { formatCurrency } from '../utils/helpers';
import writtenNumber from 'written-number';
import { PAGE_SIZE } from '../utils/constants';
import moment from 'moment';
export default function SingleInvoice({
  type,
  lang,
  moneyType,
  data,
  companyName,
  isCompany,
  capitalData,
  ownerName,
  totalValuePerOwner,
  MoneyValue,
  personsBalance,
  allCombinedData,
  TotalBalanceWithoutMinus,
  acountTotal,
}) {
  // const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toPDF, targetRef } = usePDF({ filename: `invoice.pdf` });
  // const lang = searchParams.get('lang');
  // const type = searchParams.get('type');
  const { error, isLoading, settings: { USDTOAED } = {} } = useSettings();
  function splitIntoArrays(arrayOfObjects, chunkSize) {
    const result = [];
    for (let i = 0; i < arrayOfObjects.length; i += chunkSize) {
      result.push(arrayOfObjects.slice(i, i + chunkSize));
    }
    return result;
  }
  function splitArray(array, pageNumber) {
    if (pageNumber == 1) {
      return 0;
    } else {
      return array
        .slice(0, (pageNumber - 1) * PAGE_SIZE)
        .reduce(
          (total, item) =>
            total + (item.ingoing_purchase - item.outgoing_purchase),
          0,
        );
    }
  }

  return (
    <div className="h-full bg-gray-100 md:aspect-[100%]">
      <div className=" mx-auto">
        <div className="mx-auto w-[106rem] ">
          <div className="flex flex-row justify-center gap-4 p-8">
            <Button
              onClick={() => {
                toPDF();
              }}
              className={`bg-brand-500 w-1/4 rounded-lg py-3 text-lg font-bold text-white md:w-1/2 md:text-xl `}
            >
              پرینت
            </Button>
          </div>
          <div className="m-6 mt-5 flex flex-col gap-20 rounded-xl border-[1px] bg-white">
            <div ref={targetRef}>
              {type === 'sell' && (
                <>
                  {lang === 'en' ? (
                    <EnglishSell
                      USDTOAED={USDTOAED}
                      data={data}
                      moneyType={moneyType}
                      personsBalance={personsBalance}
                    />
                  ) : lang === 'ku' ? (
                    <KurdishSell
                      USDTOAED={USDTOAED}
                      data={data}
                      moneyType={moneyType}
                      personsBalance={personsBalance}
                    />
                  ) : lang === 'ar' ? (
                    <ArabicSell
                      USDTOAED={USDTOAED}
                      data={data}
                      moneyType={moneyType}
                      personsBalance={personsBalance}
                    />
                  ) : null}
                </>
              )}
              {type === 'company' && (
                <>
                  {lang === 'en' ? (
                    <EnglishCompany
                      USDTOAED={USDTOAED}
                      data={data}
                      moneyType={moneyType}
                      personsBalance={personsBalance}
                    />
                  ) : lang === 'ku' ? (
                    <KurdishCompany
                      USDTOAED={USDTOAED}
                      data={data}
                      moneyType={moneyType}
                      personsBalance={personsBalance}
                    />
                  ) : lang === 'ar' ? (
                    <ArabicCompany
                      USDTOAED={USDTOAED}
                      data={data}
                      moneyType={moneyType}
                      personsBalance={personsBalance}
                    />
                  ) : null}
                </>
              )}
              {type === 'getMoney' && (
                <>
                  {lang === 'en' ? (
                    <EnglishInvoiceGet
                      USDTOAED={USDTOAED}
                      data={data}
                      moneyType={moneyType}
                      personsBalance={personsBalance}
                      TotalBalanceWithoutMinus={TotalBalanceWithoutMinus}
                    />
                  ) : lang === 'ku' ? (
                    <KurdishInvoiceGet
                      USDTOAED={USDTOAED}
                      data={data}
                      moneyType={moneyType}
                      personsBalance={personsBalance}
                      TotalBalanceWithoutMinus={TotalBalanceWithoutMinus}
                    />
                  ) : lang === 'ar' ? (
                    <ArabicInvoiceGet
                      USDTOAED={USDTOAED}
                      data={data}
                      moneyType={moneyType}
                      personsBalance={personsBalance}
                      TotalBalanceWithoutMinus={TotalBalanceWithoutMinus}
                    />
                  ) : null}
                </>
              )}
              {type === 'mixed' && (
                <>
                  {lang === 'en' ? (
                    <div className="">
                      {allCombinedData?.length > 0 ? (
                        splitIntoArrays(allCombinedData, PAGE_SIZE)?.map(
                          (arr, index) => {
                            return (
                              <EnglishMixed
                                key={index}
                                USDTOAED={USDTOAED}
                                data={arr}
                                moneyType={moneyType}
                                companyName={companyName}
                                isCompany={isCompany}
                                startAt={splitArray(allCombinedData, index + 1)}
                                acountTotal={acountTotal}
                              />
                            );
                          },
                        )
                      ) : (
                        <EnglishMixed
                          USDTOAED={USDTOAED}
                          data={[]}
                          moneyType={moneyType}
                          companyName={companyName}
                          isCompany={isCompany}
                          startAt={0}
                          acountTotal={acountTotal}
                        />
                      )}
                    </div>
                  ) : lang === 'ku' ? (
                    <div className="">
                      {splitIntoArrays(allCombinedData, PAGE_SIZE)?.map(
                        (arr, index) => {
                          return (
                            <KurdishMixed
                              key={index}
                              startAt={splitArray(allCombinedData, index + 1)}
                              USDTOAED={USDTOAED}
                              data={arr}
                              moneyType={moneyType}
                              companyName={companyName}
                              isCompany={isCompany}
                              acountTotal={acountTotal}
                            />
                          );
                        },
                      )}
                    </div>
                  ) : lang === 'ar' ? (
                    <div className="">
                      {splitIntoArrays(allCombinedData, PAGE_SIZE)?.map(
                        (arr, index) => {
                          return (
                            <ArabicMixed
                              key={index}
                              USDTOAED={USDTOAED}
                              data={arr}
                              moneyType={moneyType}
                              companyName={companyName}
                              isCompany={isCompany}
                              startAt={splitArray(allCombinedData, index + 1)}
                              acountTotal={acountTotal}
                            />
                          );
                        },
                      )}
                    </div>
                  ) : null}
                </>
              )}
              {type === 'dashinvo' && (
                <DashBoard USDTOAED={USDTOAED} data={data} />
              )}
              {type === 'boxinvo' && (
                <BoxInvo USDTOAED={USDTOAED} data={data} />
              )}
              {type === 'alldebtinvo' && (
                <AllDebtInvo USDTOAED={USDTOAED} data={data} />
              )}
              {type === 'getdebtinvo' && (
                <div className="">
                  {splitIntoArrays(allCombinedData, PAGE_SIZE)?.map(
                    (arr, index) => {
                      return (
                        <GetDebtInvo
                          key={index}
                          USDTOAED={USDTOAED}
                          data={arr}
                          startAt={splitArray(allCombinedData, index + 1)}
                        />
                      );
                    },
                  )}
                </div>
              )}
              {type === 'inventory' && (
                <InventoryInvo USDTOAED={USDTOAED} data={data} />
              )}
              {type === 'share' && (
                <ShareInvoice
                  USDTOAED={USDTOAED}
                  data={data}
                  totalValuePerOwner={totalValuePerOwner}
                  capitalData={capitalData}
                  ownerName={ownerName}
                  MoneyValue={MoneyValue}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnglishCompany({ data, moneyType, USDTOAED, personsBalance }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  // console.log(moneyType);
  return (
    <>
      <div className="flex h-[383mm]  flex-col font-bold">
        <div className=" flex  w-full  flex-row justify-between  px-40 ">
          <div>
            <img src={Logo} alt="logo" className="w-80 " />
          </div>
          <div className="flex h-full max-w-md items-center justify-center text-4xl">
            <div className="">{data?.company_name}</div>
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl ">INVOICE Number</h1>
            <h1 className="mr-auto text-5xl ">#{data?.invoice_number}</h1>
          </div>
        </div>
        <div className="mt-3 flex flex-row justify-between px-40">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-5xl font-bold">Madinat AL-Hawtf Company</h1>
            <div className=" w-fit text-left">
              <p>
                Sirwan Nwe mall, second Floor, 14-15
                <br /> Mawlawi St
              </p>
              <p>Sulaymaniyah</p>
              <p>Kurdistan-Iraq</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">Balance Due</h1>
            <p className="ltr text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'AED'
                  ? (data?.total_money - data?.money_number) * USDTOAED
                  : data?.total_money - data?.money_number,
                moneyType,
              )}{' '}
            </p>
          </div>
        </div>
        <div className="rtl mt-10 flex flex-row items-end justify-between px-40">
          <div className="flex w-1/4 flex-col  justify-between gap-3">
            {/* <div className="flex flex-row-reverse justify-between ">
              <p className="w-1/2 text-right text-2xl">
                : Date of incoming bill{' '}
              </p>
              <p className="text-2xl">{data?.date}</p>
            </div> */}
          </div>
          <div className="flex flex-col items-end justify-end">
            <h1 className="text-2xl">bill from</h1>
            <p className="mb-5 text-6xl font-bold">{data?.company_name}</p>
          </div>
        </div>
        <div className="mt-6 px-40">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500  ">
              <thead className="bg-stone-700 text-2xl uppercase text-white ">
                <tr className="divide-x-[1px]">
                  <th scope="col" className="w-[2%] px-6 py-3 text-center">
                    Number
                  </th>
                  <th scope="col" className="w-[43%] px-6 py-3">
                    note
                  </th>
                  <th scope="col" className="w-[20%] px-6 py-3 text-center">
                    The money of the bill
                  </th>
                  <th scope="col" className="w-[15%] px-6 py-3 text-center">
                    Money paid
                  </th>
                  <th scope="col" className="w-[20%] px-6 py-3 text-center">
                    Total bill payments
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-b bg-white text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-center  ">
                    1
                  </th>
                  <th scope="row" className=" px-6 py-4  ">
                    {data?.note}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? data?.total_money * USDTOAED
                        : data?.total_money,
                      moneyType,
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? data?.money_number * USDTOAED
                        : data?.money_number,
                      moneyType,
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? (data?.total_money - data?.money_number) * USDTOAED
                        : data?.total_money - data?.money_number,
                      moneyType,
                    )}{' '}
                  </td>
                </tr>

                <tr className="w-full border-b-[1px] border-t-2 border-stone-700  bg-white text-2xl text-black ">
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center font-bold">Sub total</td>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? (data?.total_money - data?.money_number) * USDTOAED
                        : data?.total_money - data?.money_number,
                      moneyType,
                    )}{' '}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="rtl mt-16 flex w-full flex-row px-40">
          <div className="flex w-1/4 flex-col  justify-between gap-5">
            <div className="flex flex-row-reverse justify-between ">
              <p className="w-1/2 text-right text-3xl">: Total </p>
              <p className="ltr text-3xl font-bold">
                {newFormatCurrency(
                  moneyType === 'AED'
                    ? data?.total_money * USDTOAED
                    : data?.total_money,
                  moneyType,
                )}
              </p>
            </div>
            <div className="flex flex-row-reverse justify-between p-1">
              <p className="w-1/2 text-right text-3xl font-bold">
                : Balance Due
              </p>
              <p className="ltr text-3xl font-bold">
                {newFormatCurrency(
                  (moneyType === 'AED'
                    ? (data?.total_money - data?.money_number) * USDTOAED
                    : data?.total_money - data?.money_number) +
                    personsBalance?.total,
                  moneyType,
                )}{' '}
              </p>
            </div>
            <div className="flex flex-row-reverse items-end gap-2 ">
              <p className="text-right text-3xl"> :Total in Word </p>
              <p className="text-3xl font-bold">
                {data?.total_money - data?.money_number < 0 ? 'Negative ' : ''}
                {writtenNumber(
                  moneyType === 'AED'
                    ? Math.abs(
                        (data?.total_money - data?.money_number) * USDTOAED,
                      )
                    : Math.abs(data?.total_money - data?.money_number),
                  { lang: 'en' },
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-row px-40">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-start text-xl">
              <h1>note</h1>
              <p>{data?.note}</p>
            </div>
            <div>
              <img src={Mor} alt="logo" className="w-80 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function KurdishCompany({ data, moneyType, USDTOAED, personsBalance }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  return (
    <>
      <div className="flex h-[383mm] flex-col font-bold">
        <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
          <div>
            <img src={Logo} alt="logo" className="w-80 " />
          </div>
          <div className="flex h-full max-w-md items-center justify-center text-4xl">
            <div className="">{data?.company_name}</div>
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl ">ژمارەی وەسڵ</h1>
            <h1 className="mr-auto text-5xl ">#{data?.invoice_number}</h1>
          </div>
        </div>
        <div className="rtl mt-3 flex flex-row justify-between px-40">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-5xl font-bold">کۆمپانیای مدينة الهواتف </h1>
            <div className=" w-fit text-right">
              <p>
                سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                <br /> شەقامی مەولەوی
              </p>
              <p>سلێمانی</p>
              <p>كوردستان العراق</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">بڕی پارە</h1>
            <p className="ltr text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'AED'
                  ? (data?.total_money - data?.money_number) * USDTOAED
                  : data?.total_money - data?.money_number,
                moneyType,
              )}{' '}
            </p>
          </div>
        </div>
        <div className="rtl rtl mt-24 flex flex-row-reverse items-end justify-between px-40">
          <div className="flex w-1/4 flex-col  justify-between gap-3">
            <div className="flex flex-row justify-between ">
              <p className="w-1/2 text-right text-2xl">
                {' '}
                بەرواری وەسڵی هاتوو :{' '}
              </p>
              <p className="text-2xl">{data?.date}</p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-end">
            <h1 className="ml-auto text-2xl">وەسڵی هاتوو لە </h1>
            <p className="mb-5 text-6xl font-bold">{data?.company_name}</p>
          </div>
        </div>
        <div className="mt-6 px-40">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500  ">
              <thead className="bg-stone-700 text-2xl uppercase text-white ">
                <tr className="divide-x-[1px]">
                  <th scope="col" className="w-[2%] px-6 py-3 text-center">
                    ژمارە
                  </th>
                  <th scope="col" className="w-[43%] px-6  py-3">
                    تێبینی
                  </th>
                  <th scope="col" className="w-[20%] px-6 py-3 text-center">
                    پارەی وەسڵ
                  </th>
                  <th scope="col" className="w-[15%] px-6 py-3 text-center">
                    پارەی دراو
                  </th>
                  <th scope="col" className="w-[20%] px-6 py-3 text-center">
                    کۆی گشتی پارەی وەسڵ
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-b bg-white text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-center  ">
                    1
                  </th>
                  <th scope="row" className=" px-6 py-4  ">
                    {data?.note}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? data?.total_money * USDTOAED
                        : data?.total_money,
                      moneyType,
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? data?.money_number * USDTOAED
                        : data?.money_number,
                      moneyType,
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? (data?.total_money - data?.money_number) * USDTOAED
                        : data?.total_money - data?.money_number,
                      moneyType,
                    )}{' '}
                  </td>
                </tr>

                <tr className="w-full border-b-[1px] border-t-2 border-stone-700  bg-white text-2xl text-black ">
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center font-bold">کۆی نرخ</td>
                  <td className="ltr px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? (data?.total_money - data?.money_number) * USDTOAED
                        : data?.total_money - data?.money_number,
                      moneyType,
                    )}{' '}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="rtl mt-16 flex w-full flex-row px-40">
          <div className="flex w-1/3 flex-col  justify-between gap-5">
            <div className="flex flex-row-reverse justify-between ">
              <p className="w-1/2 text-right text-3xl">: کۆی گشتی </p>
              <p className="ltr text-3xl font-bold">
                {newFormatCurrency(
                  moneyType === 'AED'
                    ? data?.total_money * USDTOAED
                    : data?.total_money,
                  moneyType,
                )}{' '}
              </p>
            </div>
            <div className="flex flex-row-reverse justify-between ">
              <p className="w-1/2 text-right text-3xl font-bold">: باڵانس</p>
              <p className="ltr text-3xl font-bold">
                {newFormatCurrency(
                  (moneyType === 'AED'
                    ? (data?.total_money - data?.money_number) * USDTOAED
                    : data?.total_money - data?.money_number) +
                    personsBalance?.total,
                  moneyType,
                )}{' '}
              </p>
            </div>
            {/* <div className="flex flex-col items-start gap-2 ">
              <p className="w-1/2 text-right text-3xl">کۆی گشتی بە وشە : </p>
              <p className="text-2xl font-bold"></p>
            </div> */}
          </div>
        </div>
        <div className="mt-auto flex flex-row px-40">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-start text-xl">
              <h1>تێبینی</h1>
              <p>{data?.note}</p>
            </div>
            <div>
              <img src={Mor} alt="logo" className="w-80 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ArabicCompany({ data, moneyType, USDTOAED, personsBalance }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  return (
    <>
      <div className="flex h-[383mm] flex-col font-bold">
        <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
          <div>
            <img src={Logo} alt="logo" className="w-80 " />
          </div>
          <div className="flex h-full max-w-md items-center justify-center text-4xl">
            <div className="">{data?.company_name}</div>
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl ">رقم الفاتورة</h1>
            <h1 className="mr-auto text-5xl ">#{data?.invoice_number}</h1>
          </div>
        </div>
        <div className="rtl mt-3 flex flex-row justify-between px-40">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-5xl font-bold">شرکة مدينة الهواتف</h1>
            <div className=" w-fit text-right">
              <p>
                سيروان نوي مول، الطابق الثاني، 14-15
                <br /> شارع المولوي
              </p>
              <p>السليمانية</p>
              <p>كردستان العراق</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">مبلغ</h1>
            <p className="text-5xl font-bold">
              {' '}
              {newFormatCurrency(
                moneyType === 'AED'
                  ? (data?.total_money - data?.money_number) * USDTOAED
                  : data?.total_money - data?.money_number,
                moneyType,
              )}{' '}
            </p>
          </div>
        </div>
        <div className="rtl mt-24 flex flex-row-reverse items-end justify-between px-40">
          <div className="flex w-1/4 flex-col  justify-between gap-3">
            <div className="flex flex-row justify-between ">
              <p className="w-1/2 text-right text-2xl">
                {' '}
                تاريخ الفاتورة الواردة :{' '}
              </p>
              <p className="text-2xl">{data?.date}</p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-end">
            <h1 className="ml-auto text-2xl"> الفاتورة تأتي من</h1>
            <p className="mb-5 text-6xl font-bold">{data?.company_name}</p>
          </div>
        </div>
        <div className="mt-6 px-40">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500  ">
              <thead className="bg-stone-700 text-2xl uppercase text-white ">
                <tr className="divide-x-[1px]">
                  <th scope="col" className="w-[2%] px-6 py-3 text-center">
                    رقم
                  </th>
                  <th scope="col" className="w-[43%] px-6  py-3">
                    ملحوظة
                  </th>
                  <th scope="col" className="w-[20%] px-6 py-3 text-center">
                    أموال الفاتورة
                  </th>
                  <th scope="col" className="w-[15%] px-6 py-3 text-center">
                    المال المدفوع
                  </th>
                  <th scope="col" className="w-[20%] px-6 py-3 text-center">
                    إجمالي دفعات الفواتير
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-b bg-white text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-center  ">
                    1
                  </th>
                  <th scope="row" className=" px-6 py-4  ">
                    {data?.note}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? data?.total_money * USDTOAED
                        : data?.total_money,
                      moneyType,
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? data?.money_number * USDTOAED
                        : data?.money_number,
                      moneyType,
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? (data?.total_money - data?.money_number) * USDTOAED
                        : data?.total_money - data?.money_number,
                      moneyType,
                    )}{' '}
                  </td>
                </tr>

                <tr className="w-full border-b-[1px] border-t-2 border-stone-700  bg-white text-2xl text-black ">
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center"></td>
                  <td className="px-6 py-4 text-center font-bold">
                    الإجمال سعر
                  </td>
                  <td className="px-6 py-4 text-center">
                    {newFormatCurrency(
                      moneyType === 'AED'
                        ? (data?.total_money - data?.money_number) * USDTOAED
                        : data?.total_money - data?.money_number,
                      moneyType,
                    )}{' '}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="rtl mt-16 flex w-full flex-row px-40">
          <div className="flex w-1/3 flex-col  justify-between gap-5">
            <div className="flex flex-row-reverse justify-between ">
              <p className="w-1/2 text-right text-3xl ">: المجموع </p>
              <p className="text-3xl font-bold">
                {newFormatCurrency(
                  moneyType === 'AED'
                    ? data?.total_money * USDTOAED
                    : data?.total_money,
                  moneyType,
                )}{' '}
              </p>
            </div>
            <div className="flex flex-row-reverse justify-between ">
              <p className="w-1/2 text-right text-3xl ">: الرصيد</p>
              <p className="text-3xl font-bold">
                {newFormatCurrency(
                  (moneyType === 'AED'
                    ? (data?.total_money - data?.money_number) * USDTOAED
                    : data?.total_money - data?.money_number) +
                    personsBalance?.total,
                  moneyType,
                )}{' '}
              </p>
            </div>
            <div className="flex flex-row-reverse items-start gap-2 ">
              <p className="flex-shrink-0 text-right text-3xl">
                المجموع بالكلمات :{' '}
              </p>
              <p className="text-3xl font-bold">
                {data?.total_money - data?.money_number < 0 ? 'سالب ' : ''}
                {writtenNumber(
                  moneyType === 'AED'
                    ? Math.abs(
                        (data?.total_money - data?.money_number) * USDTOAED,
                      )
                    : Math.abs(data?.total_money - data?.money_number),
                  { lang: 'ar' },
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-row px-40">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-start text-xl">
              <h1>ملحوظات</h1>
              <p>{data?.note}</p>
            </div>
            <div>
              <img src={Mor} alt="logo" className="w-80 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EnglishSell({ data, moneyType, USDTOAED, personsBalance }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  useEffect(() => {
    let totalQTY = 0;
    let totalPrice = 0;
    data?.areayOfItems?.map(item => {
      totalQTY += Number(item?.item_quantity);
      totalPrice += item?.total_price;
    });
    setTotalQty(totalQTY);
    setTotalPrice(totalPrice);
  }, [data]);

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const transactionLength = data?.areayOfItems?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));

  return (
    <>
      {arrayObject?.map((item, i) => {
        return (
          <div className="flex h-[383mm]  flex-col font-bold">
            <div className=" flex  w-full  flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col items-center justify-center gap-4">
                <h1 className="text-6xl ">INVOICE Number</h1>
                <h1 className="mr-auto text-5xl ">#{data?.invoice_number}</h1>
              </div>
            </div>
            <div className="mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">Madinat AL-Hawtf Company</h1>
                <div className="w-fit text-left text-3xl">
                  <p>
                    Sirwan Nwe mall, second Floor, 14-15
                    <br /> Mawlawi St
                  </p>
                  <p>Sulaymaniyah</p>
                  <p>Kurdistan-Iraq</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold">Balance Due</h1>
                <p className="text-5xl font-bold">
                  {newFormatCurrency(
                    moneyType === 'AED' ? data?.total * USDTOAED : data?.total,
                    moneyType,
                  )}
                </p>
              </div>
            </div>
            <div className="rtl mt-10 flex flex-row justify-between px-40">
              <div className="flex w-1/4 flex-col  justify-between gap-3">
                <div className="flex flex-row-reverse justify-between ">
                  <p className="w-1/2 text-right text-2xl">: Invoice date </p>
                  <p className="text-2xl">{data?.transaction_date}</p>
                </div>

                <div className="flex flex-row-reverse justify-between ">
                  <p className="w-1/2 text-right text-2xl">: Due Date</p>
                  <p className="text-2xl">{data?.return_date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end ">
                <h1 className="text-3xl">Seller</h1>
                <p className="text-4xl font-bold">{data?.seller_name}</p>
              </div>
            </div>
            <div className="mt-10 px-40">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-[2%] px-6 py-3 text-center">
                        Number
                      </th>
                      <th scope="col" className="w-[48%] px-6  py-3">
                        item & description
                      </th>
                      <th scope="col" className="w-[10%] px-6 py-3 text-center">
                        Qty
                      </th>
                      <th scope="col" className="w-[15%] px-6 py-3 text-center">
                        Price
                      </th>
                      <th scope="col" className="w-[25%] px-6 py-3 text-center">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.areayOfItems
                      ?.slice(item.first, item.last)
                      ?.map((item, i) => {
                        return (
                          <tr
                            key={i}
                            className="border-b bg-white text-2xl text-black"
                          >
                            <th
                              scope="row"
                              className=" px-6 py-4 text-center  "
                            >
                              {i + 1}
                            </th>
                            <th scope="row" className=" px-6 py-4  ">
                              {item?.item_name}
                            </th>
                            <td className="px-6 py-4 text-center">
                              {item?.item_quantity}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {formatCurrencyWithoutRound(
                                moneyType === 'AED'
                                  ? item?.item_price * USDTOAED
                                  : item?.item_price,
                                moneyType,
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {formatCurrencyWithoutRound(
                                moneyType === 'AED'
                                  ? item?.total_price * USDTOAED
                                  : item?.total_price,
                                moneyType,
                              )}{' '}
                            </td>
                          </tr>
                        );
                      })}

                    {i === arrayObject.length - 1 && (
                      <>
                        <tr className="w-full border-b-[1px] border-t-2 border-stone-700  bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center font-bold">
                            Sub total
                          </td>
                          <td className="px-6 py-4 text-center">
                            {formatCurrencyWithoutRound(
                              moneyType === 'AED'
                                ? totalPrice * USDTOAED
                                : totalPrice,
                              moneyType,
                            )}{' '}
                          </td>
                        </tr>
                        <tr className=" w-full  border-stone-700 bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 ">
                            Total QTY :{' '}
                            <span className="font-bold text-neutral-500">
                              {totalQty}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 text-center text-neutral-500">
                            rounding
                          </td>
                          <td className="px-6 text-center text-neutral-500">
                            0.5
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {i === arrayObject.length - 1 && (
              <div className="rtl mt-16 flex w-full flex-row px-40">
                <div className="flex w-1/3 flex-col  justify-between gap-5">
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl ">: Total bill </p>
                    <p className="ltr text-3xl font-bold">
                      {newFormatCurrency(
                        moneyType === 'AED'
                          ? totalPrice * USDTOAED
                          : totalPrice,
                        moneyType,
                      )}{' '}
                    </p>
                  </div>
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl font-bold">
                      : total account Balance
                    </p>
                    <p className="ltr text-3xl font-bold">
                      {newFormatCurrency(
                        (moneyType === 'AED'
                          ? totalPrice * USDTOAED
                          : totalPrice) +
                          (moneyType === 'AED'
                            ? personsBalance?.total * USDTOAED
                            : personsBalance?.total),
                        moneyType,
                      )}{' '}
                    </p>
                  </div>
                  <div className="flex flex-row-reverse items-end gap-2 ">
                    <p className="text-right text-3xl">: Total in Word</p>
                    <p className="text-3xl font-bold">
                      {totalPrice < 0 ? 'Negative ' : ''}
                      {writtenNumber(
                        moneyType === 'AED'
                          ? Math.abs(totalPrice * USDTOAED)
                          : Math.abs(totalPrice),
                        { lang: 'en' },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                <div className="text-x; flex flex-col items-start">
                  <h1 className="ltr mb-0.5">note :</h1>
                  <p>{data?.note}</p>
                </div>
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function KurdishSell({ data, moneyType, USDTOAED, personsBalance }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  useEffect(() => {
    let totalQTY = 0;
    let totalPrice = 0;
    data?.areayOfItems?.map(item => {
      totalQTY += Number(item?.item_quantity);
      totalPrice += item?.total_price;
    });
    setTotalQty(totalQTY);

    setTotalPrice(totalPrice);
  }, [data]);

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const transactionLength = data?.areayOfItems?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));

  return (
    <>
      {arrayObject?.map((item, i) => {
        return (
          <div className="flex h-[383mm] flex-col font-bold">
            <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col items-center justify-center gap-4">
                <h1 className="text-6xl ">ژمارەی وەسڵ</h1>
                <h1 className="mr-auto text-5xl ">#{data?.invoice_number}</h1>
              </div>
            </div>
            <div className="rtl mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">کۆمپانیای مدينة الهواتف </h1>
                <div className="w-fit text-right text-3xl">
                  <p>
                    سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                    <br /> شەقامی مەولەوی
                  </p>
                  <p>سلێمانی</p>
                  <p>كوردستان العراق</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold">بڕی پارە</h1>
                <p className="ltr text-5xl font-bold">
                  {newFormatCurrency(
                    moneyType === 'AED' ? data?.total * USDTOAED : data?.total,
                    moneyType,
                  )}{' '}
                </p>
              </div>
            </div>
            <div className="rtl rtl mt-10 flex flex-row-reverse justify-between px-40">
              <div className="flex w-1/3 flex-col  justify-between gap-3">
                <div className="flex-row= flex justify-between ">
                  <p className="w-1/2 text-right text-2xl">
                    {' '}
                    بەرواری فرۆشتن :{' '}
                  </p>
                  <p className="text-2xl">{data?.transaction_date}</p>
                </div>

                <div className="flex flex-row justify-between ">
                  <p className="w-1/2 text-right text-2xl">
                    بەرواری گەڕاندنەوە :
                  </p>
                  <p className="text-2xl">{data?.return_date}</p>
                </div>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end justify-end">
                <h1 className="text-righ ml-auto text-3xl">كڕیار :</h1>
                <p className="text-4xl font-bold">{data?.seller_name}</p>
              </div>
            </div>
            <div className="mt-10 px-40">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px] ">
                      <th
                        scope="col"
                        className="w-[2%] -translate-y-3 px-6 py-3 text-center"
                      >
                        ژمارە
                      </th>
                      <th
                        scope="col"
                        className="w-[48%] -translate-y-3  px-6 py-3 text-center"
                      >
                        وەسفکردنی بابەت
                      </th>
                      <th
                        scope="col"
                        className="w-[10%] -translate-y-3 px-6 py-3 text-center"
                      >
                        بڕ
                      </th>
                      <th
                        scope="col"
                        className="w-[15%] -translate-y-3 px-6 py-3 text-center"
                      >
                        نرخ
                      </th>
                      <th
                        scope="col"
                        className="w-[25%] -translate-y-3 px-6 py-3 text-center"
                      >
                        کۆی گشتی
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.areayOfItems
                      ?.slice(item.first, item.last)
                      ?.map((item, i) => {
                        return (
                          <tr
                            key={i}
                            className="border-b bg-white text-2xl text-black"
                          >
                            <th
                              scope="row"
                              className=" px-6 py-4 text-center  "
                            >
                              {i + 1}
                            </th>
                            <th scope="row" className=" px-6 py-4  ">
                              {item?.item_name}
                            </th>
                            <td className="px-6 py-4 text-center">
                              {item?.item_quantity}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {formatCurrencyWithoutRound(
                                moneyType === 'AED'
                                  ? item?.item_price * USDTOAED
                                  : item?.item_price,
                                moneyType,
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {formatCurrencyWithoutRound(
                                moneyType === 'AED'
                                  ? item?.total_price * USDTOAED
                                  : item?.total_price,
                                moneyType,
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    {i === arrayObject.length - 1 && (
                      <>
                        <tr className="w-full border-b-[1px] border-t-2 border-stone-700  bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center font-bold">
                            کۆی نرخ
                          </td>
                          <td className="px-6 py-4 text-center">
                            {formatCurrencyWithoutRound(
                              moneyType === 'AED'
                                ? totalPrice * USDTOAED
                                : totalPrice,
                              moneyType,
                            )}
                          </td>
                        </tr>
                        <tr className=" w-full  border-stone-700 bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 ">
                            کۆی بڕ :{' '}
                            <span className="font-bold text-neutral-500">
                              {totalQty}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 text-center text-neutral-500">
                            نزیکردنەوە
                          </td>
                          <td className="px-6 text-center text-neutral-500">
                            0.5
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {i === arrayObject.length - 1 && (
              <div className="rtl mt-16 flex w-full flex-row px-40">
                <div className="flex w-1/3 flex-col  justify-between gap-5">
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl ">
                      : کۆی گشتی وەسڵ{' '}
                    </p>
                    <p className="ltr text-3xl font-bold">
                      {newFormatCurrency(
                        moneyType === 'AED'
                          ? totalPrice * USDTOAED
                          : totalPrice,
                        moneyType,
                      )}{' '}
                    </p>
                  </div>
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl font-bold">
                      : کۆی گشتی حساب
                    </p>
                    <p className="ltr text-3xl font-bold">
                      {newFormatCurrency(
                        (moneyType === 'AED'
                          ? totalPrice * USDTOAED
                          : totalPrice) +
                          (moneyType === 'AED'
                            ? personsBalance?.total * USDTOAED
                            : personsBalance?.total),
                        moneyType,
                      )}{' '}
                    </p>
                  </div>
                  {/* <div className="flex flex-col items-end gap-2 ">
                    <p className="w-1/2 text-right text-3xl">
                      : کۆی گشتی بە وشە
                    </p>
                    <p className="text-2xl font-bold"></p>
                  </div> */}
                </div>
              </div>
            )}
            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                <div className="flex flex-col items-end text-xl">
                  <h1 className="mb-0.5">تێبینی</h1>
                  <p>{data?.note}</p>
                </div>
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function ArabicSell({ data, moneyType, USDTOAED, personsBalance }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  useEffect(() => {
    let totalQTY = 0;
    let totalPrice = 0;
    data?.areayOfItems?.map(item => {
      totalQTY += Number(item?.item_quantity);
      totalPrice += item?.total_price;
    });
    setTotalQty(totalQTY);
    setTotalPrice(totalPrice);
  }, [data]);

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const transactionLength = data?.areayOfItems?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));
  return (
    <>
      {arrayObject?.map((item, i) => {
        return (
          <div className="flex h-[383mm] flex-col font-bold">
            <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col items-center justify-center gap-4">
                <h1 className="text-6xl ">رقم الفاتورة</h1>
                <h1 className="mr-auto text-5xl ">#{data?.invoice_number}</h1>
              </div>
            </div>
            <div className="rtl mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">شرکة مدينة الهواتف</h1>
                <div className="w-fit text-right text-3xl">
                  <p>
                    سيروان نوي مول، الطابق الثاني، 14-15
                    <br /> شارع المولوي
                  </p>
                  <p>السليمانية</p>
                  <p>كردستان العراق</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold">مبلغ</h1>
                <p className="text-5xl font-bold">
                  {newFormatCurrency(
                    moneyType === 'AED' ? data?.total * USDTOAED : data?.total,
                    moneyType,
                  )}{' '}
                </p>
              </div>
            </div>
            <div className="rtl rtl mt-10 flex flex-row-reverse justify-between px-40">
              <div className="flex w-1/3 flex-col  justify-between gap-3">
                <div className="flex-row= flex justify-between ">
                  <p className="w-1/2 text-right text-2xl">
                    {' '}
                    تاريخ الفاتورة::{' '}
                  </p>
                  <p className="text-2xl">{data?.transaction_date}</p>
                </div>

                <div className="flex-row= flex justify-between ">
                  <p className="w-1/2 text-right text-2xl">تاريخ الاستحقاق :</p>
                  <p className="text-2xl">{data?.return_date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <h1 className="ml-auto text-3xl">تاجر</h1>
                <p className="text-4xl font-bold">{data?.seller_name} </p>
              </div>
            </div>
            <div className="mt-6 px-40">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-[2%] px-6 py-3 text-center">
                        رقم
                      </th>
                      <th scope="col" className="w-[48%] px-6  py-3">
                        وصف السلعة
                      </th>
                      <th scope="col" className="w-[10%] px-6 py-3 text-center">
                        كمية
                      </th>
                      <th scope="col" className="w-[15%] px-6 py-3 text-center">
                        سعر
                      </th>
                      <th scope="col" className="w-[25%] px-6 py-3 text-center">
                        المجموع
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.areayOfItems
                      ?.slice(item.first, item.last)
                      ?.map((item, i) => {
                        return (
                          <tr
                            key={i}
                            className="border-b bg-white text-2xl text-black"
                          >
                            <th
                              scope="row"
                              className=" px-6 py-4 text-center   "
                            >
                              {i + 1}
                            </th>
                            <th scope="row" className=" px-6 py-4  ">
                              {item?.item_name}
                            </th>
                            <td className="px-6 py-4 text-center">
                              {item?.item_quantity}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {' '}
                              {formatCurrencyWithoutRound(
                                moneyType === 'AED'
                                  ? item?.item_price * USDTOAED
                                  : item?.item_price,
                                moneyType,
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {formatCurrencyWithoutRound(
                                moneyType === 'AED'
                                  ? item?.total_price * USDTOAED
                                  : item?.total_price,
                                moneyType,
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    {i === arrayObject.length - 1 && (
                      <>
                        <tr className="w-full border-b-[1px] border-t-2 border-stone-700  bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center font-bold">
                            الإجمال سعر
                          </td>
                          <td className="px-6 py-4 text-center">
                            {formatCurrencyWithoutRound(
                              moneyType === 'AED'
                                ? totalPrice * USDTOAED
                                : totalPrice,
                              moneyType,
                            )}{' '}
                          </td>
                        </tr>
                        <tr className=" w-full  border-stone-700 bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 ">
                            الكمية الإجمالية :{' '}
                            <span className="font-bold text-neutral-500">
                              {totalQty}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 text-center text-neutral-500">
                            التقريب
                          </td>
                          <td className="px-6 text-center text-neutral-500">
                            0.5
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {i === arrayObject.length - 1 && (
              <div className="rtl mt-16 flex w-full flex-row px-40">
                <div className="flex w-1/3 flex-col  justify-between gap-5">
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl">: المجموع </p>
                    <p className="ltr text-3xl font-bold">
                      {newFormatCurrency(
                        moneyType === 'AED'
                          ? totalPrice * USDTOAED
                          : totalPrice,
                        moneyType,
                      )}{' '}
                    </p>
                  </div>
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl font-bold">
                      : الرصيد
                    </p>
                    <p className="ltr text-3xl font-bold">
                      {newFormatCurrency(
                        (moneyType === 'AED'
                          ? totalPrice * USDTOAED
                          : totalPrice) +
                          (moneyType === 'AED'
                            ? personsBalance?.total * USDTOAED
                            : personsBalance?.total),
                        moneyType,
                      )}{' '}
                    </p>
                  </div>
                  <div className="flex flex-row-reverse items-end gap-2 ">
                    <p className=" flex-shrink-0 text-right text-3xl">
                      : المجموع بالكلمات
                    </p>
                    <p className="text-3xl font-bold">
                      {totalPrice < 0 ? 'سالب ' : ''}
                      {writtenNumber(
                        moneyType === 'AED'
                          ? Math.abs(totalPrice * USDTOAED)
                          : Math.abs(totalPrice),
                        { lang: 'ar' },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                <div className="flex flex-col items-end text-xl">
                  <h1 className="mb-0.5">ملحوظات</h1>
                  <p>{data?.note}</p>
                </div>
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function EnglishInvoiceGet({
  data,
  moneyType,
  USDTOAED,
  personsBalance,
  TotalBalanceWithoutMinus,
}) {
  return (
    <>
      <div className="flex h-[383mm]  flex-col font-bold">
        <div className=" flex  w-full  flex-row justify-between  px-40 ">
          <div>
            <img src={Logo} alt="logo" className="w-80 " />
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl ">INVOICE Number</h1>
            <h1 className="mr-auto text-5xl ">
              #{data?.invoice_number} Number
            </h1>
          </div>
        </div>
        <div className="mt-3 flex flex-row justify-between px-40">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-5xl font-bold">Madinat AL-Hawtf Company</h1>
            <div className="w-fit text-left text-3xl">
              <p>
                Sirwan Nwe mall, second Floor, 14-15
                <br /> Mawlawi St
              </p>
              <p>Sulaymaniyah</p>
              <p>Kurdistan-Iraq</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">Balance Due</h1>
            <p className="ltr text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'AED' ? data?.amount * USDTOAED : data?.amount,
                moneyType,
              )}{' '}
            </p>
          </div>
        </div>
        <div className="rtl mt-10 flex flex-row justify-between px-40">
          <div className="flex w-1/3 flex-col  justify-between gap-3">
            <div className="flex flex-row-reverse justify-between ">
              <p className="w-1/2 text-right text-3xl font-bold">
                : Invoice date{' '}
              </p>
              <p className="text-3xl">{data?.transaction_date}</p>
            </div>
          </div>
        </div>
        <div className="mt-32 flex flex-col gap-20 px-40">
          <div className="flex flex-col gap-3">
            <h1 className="text-left  text-5xl">Balance Due</h1>
            <p className="ltr text-left text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'AED' ? data?.amount * USDTOAED : data?.amount,
                moneyType,
              )}{' '}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-left  text-5xl">Remaining Money Amount</h1>
            <p className="text-left text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'IQD'
                  ? personsBalance?.total * USDTOAED -
                      (TotalBalanceWithoutMinus ? 0 : data?.amount * USDTOAED)
                  : personsBalance?.total -
                      (TotalBalanceWithoutMinus ? 0 : data?.amount),
                moneyType,
              )}{' '}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-left  text-5xl">instead of account</h1>
            <p className="text-left text-5xl font-bold">{data?.seller_name}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="ltr text-left text-5xl">Retrieved from mr.</h1>
            <p className="text-left text-5xl font-bold">{data?.receved_from}</p>
          </div>
        </div>
        <div className="mt-32 flex flex-row justify-between px-40">
          <div className="flex flex-col gap-10">
            <p className="text-center text-5xl">Accountant</p>
            <p className="h-[1px] w-80 bg-black"></p>
          </div>
          <div className="flex flex-col gap-10">
            <p className="text-center text-5xl">Payer </p>
            <p className="h-[1px] w-80 bg-black"></p>
          </div>
        </div>
        <div className="mt-auto flex flex-row px-40">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-start text-xl">
              <h1>note</h1>
              <p>{data.note}</p>
            </div>
            <div>
              <img src={Mor} alt="logo" className="w-80 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function KurdishInvoiceGet({
  data,
  moneyType,
  USDTOAED,
  personsBalance,
  TotalBalanceWithoutMinus,
}) {
  return (
    <>
      <div className="flex h-[383mm] flex-col font-bold">
        <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
          <div>
            <img src={Logo} alt="logo" className="w-80 " />
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl ">ژمارەی وەسڵ</h1>
            <h1 className="mr-auto text-5xl ">#{data?.invoice_number}</h1>
          </div>
        </div>
        <div className="rtl mt-3 flex flex-row justify-between px-40">
          <div className="flex flex-col items-start gap-3">
            <h1 className="rtl text-5xl font-bold">کۆمپانیای مدينة الهواتف </h1>
            <div className="w-fit text-right text-3xl">
              <p>
                سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                <br /> شەقامی مەولەوی
              </p>
              <p>سلێمانی</p>
              <p>كوردستان العراق</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">بڕی پارە</h1>
            <p className=" text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'AED' ? data?.amount * USDTOAED : data?.amount,
                moneyType,
              )}{' '}
            </p>
          </div>
        </div>
        <div className="rtl rtl mt-10 flex flex-row-reverse justify-between px-40">
          <div className="flex w-[34%] flex-col  justify-between gap-3">
            <div className="flex-row= flex justify-between ">
              <p className="w-1/2 text-right text-3xl font-bold">
                {' '}
                ڕۆژی پارە دان :{' '}
              </p>
              <p className="text-3xl">{data?.transaction_date}</p>
            </div>
          </div>
        </div>

        <div className="mt-32 flex flex-col items-end gap-20 px-40">
          <div className="flex flex-col gap-3">
            <h1 className="text-right  text-6xl">بڕی پارە</h1>
            <p className="text-right text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'AED' ? data?.amount * USDTOAED : data?.amount,
                moneyType,
              )}{' '}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-right  text-6xl">بڕی پارەی ماوە</h1>
            <p className="text-right text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'IQD'
                  ? personsBalance?.total * USDTOAED -
                      (TotalBalanceWithoutMinus ? 0 : data?.amount * USDTOAED)
                  : personsBalance?.total -
                      (TotalBalanceWithoutMinus ? 0 : data?.amount),
                moneyType,
              )}{' '}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-right  text-6xl">لەبری هەژماری </h1>
            <p className="text-right text-5xl font-bold">{data?.seller_name}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-right  text-6xl">وەرگیراوە لە بەڕێز</h1>
            <p className="text-right text-5xl font-bold">
              {data?.receved_from}
            </p>
          </div>
        </div>
        <div className="mt-32 flex flex-row justify-between px-40">
          <div className="flex flex-col gap-10">
            <p className="text-center text-5xl">ژمێریار</p>
            <p className="h-[1px] w-80 bg-black"></p>
          </div>
          <div className="flex flex-col gap-10">
            <p className="text-center text-5xl">کەسی پارەدەر</p>
            <p className="h-[1px] w-80 bg-black"></p>
          </div>
        </div>
        <div className="mt-auto flex flex-row px-40">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-start text-xl">
              <h1>تێبینی</h1>
              <p>{data.note}</p>
            </div>
            <div>
              <img src={Mor} alt="logo" className="w-80 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ArabicInvoiceGet({
  data,
  moneyType,
  USDTOAED,
  personsBalance,
  TotalBalanceWithoutMinus,
}) {
  return (
    <>
      <div className="flex h-[383mm] flex-col font-bold">
        <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
          <div>
            <img src={Logo} alt="logo" className="w-80 " />
          </div>
          <div className=" flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl ">رقم الفاتورة</h1>
            <h1 className="mr-auto text-5xl ">رقم #{data?.invoice_number}</h1>
          </div>
        </div>
        <div className="rtl mt-3 flex flex-row justify-between px-40">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-5xl font-bold">شرکة مدينة الهواتف</h1>
            <div className="w-fit text-right text-3xl">
              <p>
                سيروان نوي مول، الطابق الثاني، 14-15
                <br /> شارع المولوي
              </p>
              <p>السليمانية</p>
              <p>كردستان العراق</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">مبلغ</h1>
            <p className="text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'AED' ? data?.amount * USDTOAED : data?.amount,
                moneyType,
              )}{' '}
            </p>
          </div>
        </div>
        <div className="rtl rtl mt-10 flex flex-row-reverse justify-between px-40">
          <div className="flex w-1/3 flex-col  justify-between gap-3">
            <div className="flex-row= flex justify-between ">
              <p className="w-1/2 text-right text-3xl font-bold">
                {' '}
                تاريخ الفاتورة:{' '}
              </p>
              <p className="text-3xl">{data?.transaction_date}</p>
            </div>
          </div>
        </div>

        <div className="mt-32 flex flex-col items-end gap-20 px-40">
          <div className="flex flex-col gap-3">
            <h1 className="text-right  text-6xl">مبلغ</h1>
            <p className="text-right text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'AED' ? data?.amount * USDTOAED : data?.amount,
                moneyType,
              )}{' '}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-right  text-6xl">مقدار المال المتبقي</h1>
            <p className="text-right text-5xl font-bold">
              {newFormatCurrency(
                moneyType === 'IQD'
                  ? personsBalance?.total * USDTOAED -
                      (TotalBalanceWithoutMinus ? 0 : data?.amount * USDTOAED)
                  : personsBalance?.total -
                      (TotalBalanceWithoutMinus ? 0 : data?.amount),
                moneyType,
              )}{' '}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-right  text-6xl">بدلا من حساب </h1>
            <p className="text-right text-5xl font-bold">{data?.seller_name}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-right  text-6xl">تم الاسترجاع من السيد</h1>
            <p className="text-right text-5xl font-bold">
              {data?.receved_from}
            </p>
          </div>
        </div>
        <div className="mt-32 flex flex-row justify-between px-40">
          <div className="flex flex-col gap-10">
            <p className="text-center text-5xl">محاسب</p>
            <p className="h-[1px] w-80 bg-black"></p>
          </div>
          <div className="flex flex-col gap-10">
            <p className="text-center text-5xl">دافع</p>
            <p className="h-[1px] w-80 bg-black"></p>
          </div>
        </div>
        <div className="mt-auto flex flex-row px-40">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-start text-xl">
              <h1>ملحوظات</h1>
              <p>{data.note}</p>
            </div>
            <div>
              <img src={Mor} alt="logo" className="w-80 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EnglishMixed({
  data,
  moneyType,
  USDTOAED,
  companyName,
  startAt,
  acountTotal,
}) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  const [total, setTotal] = useState();
  const [totalii, setTotalii] = useState(0);
  // console.log(data);

  useEffect(() => {
    const totalPurchase = data.reduce(
      (total, item) => total + (item.ingoing_purchase - item.outgoing_purchase),
      startAt ? startAt : 0,
    );
    if (moneyType === 'AED') {
      setTotal(totalPurchase * USDTOAED);
    } else {
      setTotal(totalPurchase);
    }

    data?.map(item => {
      setTotalii(
        prevTotal =>
          prevTotal + (item?.outgoing_purchase - item?.ingoing_purchase),
      );
    });
  }, []);

  function getTotalForLine(index) {
    return data
      .slice(0, index + 1)
      .reduce(
        (total, item) =>
          total + (item.ingoing_purchase - item.outgoing_purchase),
        startAt ? startAt : 0,
      );
  }

  const transactionLength = data?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));

  return (
    <>
      {arrayObject?.map((item, index) => {
        return (
          <div className="flex h-[383mm] flex-col font-bold">
            <div className="   flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col  items-end justify-center gap-4">
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-3xl font-bold leading-tight"> : Date</h1>
                  <h1 className="mr-auto text-3xl  leading-tight">
                    {formattedDate}
                  </h1>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p className="mr-auto text-3xl font-bold"> : Data to</p>
                  <p className="mr-auto text-3xl font-bold">
                    {companyName ? companyName : data[0]?.sellers?.seller_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">Madinat AL-Hawtf Company</h1>
                <div className=" w-fit text-left">
                  <p>
                    Sirwan Nwe mall, second Floor, 14-15
                    <br /> Mawlawi St
                  </p>
                  <p>Sulaymaniyah</p>
                  <p>Kurdistan-Iraq</p>
                </div>
              </div>
            </div>

            <div className="mt-20 px-40">
              <div className="relative overflow-x-auto">
                <table className=" w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-[1%] px-6 py-3 text-center ">
                        Number
                      </th>
                      <th
                        scope="col"
                        className="w-[22%] px-6 py-3 text-center "
                      >
                        Date
                      </th>
                      <th scope="col" className="w-[23%] px-6 py-3 text-right">
                        Note
                      </th>
                      <th scope="col" className="w-[17%] px-6 py-3 text-center">
                        The Departed Bill
                      </th>
                      <th scope="col" className="w-[12%] px-6 py-3 text-center">
                        Incoming
                      </th>
                      <th scope="col" className="w-[12%] px-6 py-3 text-center">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.slice(item.first, item.last).map((item, i) => {
                      return (
                        <tr
                          key={i}
                          className="border-b bg-white text-2xl text-black"
                        >
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {i + 1}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {moment(item?.transaction_date).format('lll')}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-right   ">
                            {item?.note}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {formatCurrencyWithoutRound(
                              moneyType === 'AED'
                                ? item?.ingoing_purchase * USDTOAED
                                : item?.ingoing_purchase,
                              moneyType,
                            )}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {formatCurrencyWithoutRound(
                              moneyType === 'AED'
                                ? item?.outgoing_purchase * USDTOAED
                                : item?.outgoing_purchase,
                              moneyType,
                            )}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {formatCurrencyWithoutRound(
                              moneyType === 'AED'
                                ? getTotalForLine(i) * USDTOAED
                                : getTotalForLine(i),
                              moneyType,
                            )}
                          </th>
                        </tr>
                      );
                    })}
                    {index === arrayObject.length - 1 && (
                      <>
                        <tr className=" w-full  border-stone-700 bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 "></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 text-center text-neutral-500">
                            rounding
                          </td>
                          <td className="px-6 text-center text-neutral-500">
                            0.5
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {index === arrayObject.length - 1 && (
              <>
                <div className="rtl mt-16 flex w-full flex-row px-40">
                  <div className="flex w-1/3 flex-col  justify-between gap-5">
                    <div className="flex flex-row-reverse justify-between ">
                      <p className="w-1/2 text-right text-3xl ">: Total </p>
                      <p className="ltr text-3xl font-bold">
                        {Math.round(total)} {moneyType === 'AED' ? 'AED' : '$'}
                      </p>
                    </div>
                    <div className="flex flex-row-reverse justify-between ">
                      <p className="w-1/2 text-right text-3xl ">
                        : Acount Total{' '}
                      </p>
                      <p className="text-3xl font-bold">
                        {Math.round(
                          moneyType === 'IQD'
                            ? acountTotal * USDTOAED
                            : acountTotal,
                        )}
                        {moneyType === 'IQD' ? 'IQD' : '$'}
                      </p>
                    </div>
                    {/* <div className="flex flex-row-reverse items-end gap-2 ">
                      <p className=" text-right text-3xl">Total In Words : </p>
                      <p className="text-3xl font-bold">
                        {Math.round(total) < 0 ? 'Negative ' : ''}
                        {writtenNumber(
                          moneyType === 'AED'
                            ? Math.abs(total * USDTOAED)
                            : Math.abs(total),
                          { lang: 'en' },
                        )}
                      </p>
                    </div> */}
                  </div>
                </div>
              </>
            )}
            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                {/* <div className="flex flex-col items-start">
                  <h1>Note</h1>
                  <p>-------------------</p>
                </div> */}
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function ArabicMixed({
  data,
  moneyType,
  USDTOAED,
  companyName,
  startAt,
  acountTotal,
}) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  const [total, setTotal] = useState();

  useEffect(() => {
    const totalPurchase = data.reduce(
      (total, item) => total + (item.ingoing_purchase - item.outgoing_purchase),
      startAt ? startAt : 0,
    );
    if (moneyType === 'AED') {
      setTotal(totalPurchase * USDTOAED);
    } else {
      setTotal(totalPurchase);
    }
  }, []);

  function getTotalForLine(index) {
    return data
      .slice(0, index + 1)
      .reduce(
        (total, item) => total + item?.total_purchase,
        startAt ? startAt : 0,
      );
  }

  const transactionLength = data?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));
  return (
    <>
      {arrayObject?.map((item, index) => {
        return (
          <div className="flex h-[383mm] flex-col ">
            <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col  items-end justify-center gap-4">
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-3xl  leading-tight"> تاريخ :</h1>
                  <h1 className="mr-auto text-3xl  leading-tight">
                    {formattedDate}
                  </h1>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p className="mr-auto text-3xl font-bold">کشف حساب : </p>
                  <p className="mr-auto text-3xl font-bold">
                    {companyName ? companyName : data[0]?.sellers?.seller_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="rtl mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">شرکة مدينة الهواتف </h1>
                <div className=" w-fit text-right">
                  <p>
                    سيروان نوي مول، الطابق الثاني، 14-15
                    <br /> شارع المولوي
                  </p>
                  <p>السليمانية</p>
                  <p>كردستان العراق</p>
                </div>
              </div>
            </div>

            <div className="mt-20 px-40">
              <div className="relative overflow-x-auto">
                <table className=" w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-[1%] px-6 py-3 text-center ">
                        #
                      </th>
                      <th
                        scope="col"
                        className="w-[22%] px-6 py-3 text-center "
                      >
                        تاريخ
                      </th>
                      <th scope="col" className="w-[25%] px-6 py-3 text-right">
                        ملاحضة
                      </th>
                      <th scope="col" className="w-[12%] px-6 py-3 text-center">
                        الفاتورة الراحلة
                      </th>
                      <th scope="col" className="w-[12%] px-6 py-3 text-center">
                        دخل
                      </th>
                      <th scope="col" className="w-[12%] px-6 py-3 text-center">
                        نتیجة
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.slice(item.first, item.last).map((item, i) => {
                      return (
                        <tr
                          key={i}
                          className="border-b bg-white text-2xl text-black"
                        >
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {i + 1}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {moment(item?.transaction_date).format('lll')}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-right   ">
                            {item?.note}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {newFormatCurrency(
                              moneyType === 'AED'
                                ? item?.ingoing_purchase * USDTOAED
                                : item?.ingoing_purchase,
                              moneyType,
                            )}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {newFormatCurrency(
                              moneyType === 'AED'
                                ? item?.outgoing_purchase * USDTOAED
                                : item?.outgoing_purchase,
                              moneyType,
                            )}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {newFormatCurrency(
                              moneyType === 'AED'
                                ? getTotalForLine(i) * USDTOAED
                                : getTotalForLine(i),
                              moneyType,
                            )}
                          </th>
                        </tr>
                      );
                    })}
                    {index === arrayObject.length - 1 && (
                      <>
                        <tr className=" w-full  border-stone-700 bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 "></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 text-center text-neutral-500">
                            لتقريب
                          </td>
                          <td className="px-6 text-center text-neutral-500">
                            0.5
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {index === arrayObject.length - 1 && (
              <>
                <div className="rtl mt-16 flex w-full flex-row px-40">
                  <div className="flex w-1/3 flex-col  justify-between gap-5">
                    <div className="flex flex-row-reverse justify-between ">
                      <p className="w-1/2 text-right text-3xl ">
                        : الإجمال سعر{' '}
                      </p>
                      <p className="text-3xl font-bold">
                        {Math.round(total)} {moneyType === 'AED' ? 'AED' : '$'}
                      </p>
                    </div>
                    <div className="flex flex-row-reverse justify-between ">
                      <p className="w-1/2 text-right text-3xl ">
                        : الرصيد الإجمالي للحساب
                      </p>
                      <p className="text-3xl font-bold">
                        {Math.round(
                          moneyType === 'IQD'
                            ? acountTotal * USDTOAED
                            : acountTotal,
                        )}{' '}
                        {moneyType === 'IQD' ? 'IQD' : '$'}
                      </p>
                    </div>
                    {/* <div className="flex flex-col items-start gap-2 ">
                      <p className="w-1/2 text-right text-3xl">الرصيد : </p>
                      <p className="text-2xl font-bold"></p>
                    </div> */}
                  </div>
                </div>
              </>
            )}

            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function KurdishMixed({
  data,
  moneyType,
  USDTOAED,
  companyName,
  isCompany,
  startAt,
  acountTotal,
}) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const [prevPageTotal, setPrevPageTotal] = useState(0);
  const [total, setTotal] = useState();

  useEffect(() => {
    const totalPurchase = data.reduce(
      (total, item) => total + (item.ingoing_purchase - item.outgoing_purchase),
      startAt ? startAt : 0,
    );
    if (moneyType === 'AED') {
      setTotal(totalPurchase * USDTOAED);
    } else {
      setTotal(totalPurchase);
    }
  }, []);
  function getTotalForLine(index) {
    return data
      .slice(0, index + 1)
      .reduce(
        (total, item) =>
          total + (item.ingoing_purchase - item.outgoing_purchase),
        startAt ? startAt : 0,
      );
  }
  const transactionLength = data?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));
  return (
    <>
      {arrayObject?.map((item, index) => {
        return (
          <div className="flex h-[383mm] flex-col font-bold">
            <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col  items-end justify-center gap-4">
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-3xl  leading-tight"> بەروار :</h1>
                  <h1 className="mr-auto text-3xl  leading-tight">
                    {formattedDate}
                  </h1>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p className="mr-auto text-3xl">کەشف حساب : </p>
                  <p className="mr-auto text-3xl">
                    {companyName ? companyName : data[0]?.sellers?.seller_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="rtl mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">کۆمپانیای مدينة الهواتف</h1>
                <div className=" w-fit text-right">
                  <p>
                    سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                    <br /> شەقامی مەولەوی
                  </p>
                  <p>سلێمانی</p>
                  <p>كوردستان العراق</p>
                </div>
              </div>
            </div>

            <div className="mt-20 px-40">
              <div className="relative overflow-x-auto">
                <table className=" w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-[1%] px-6 py-3 text-center ">
                        ژمارە
                      </th>
                      <th
                        scope="col"
                        className="w-[25%] px-6 py-3 text-center "
                      >
                        بەروار
                      </th>
                      <th scope="col" className="w-[25%] px-6 py-3 text-right">
                        تێبینی
                      </th>
                      <th scope="col" className="w-[12%] px-6 py-3 text-center">
                        {isCompany ? 'پارەی ڕۆشتوو' : 'وەسڵی ڕۆشتوو'}
                      </th>
                      <th scope="col" className="w-[12%] px-6 py-3 text-center">
                        {isCompany ? 'وەسڵی هاتوو' : 'پارەی هاتوو'}
                      </th>
                      <th scope="col" className="w-[12%] px-6 py-3 text-center">
                        ئەنجام
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.slice(item.first, item.last).map((item, i) => {
                      return (
                        <tr
                          key={i}
                          className="border-b bg-white text-2xl text-black"
                        >
                          <th scope="row" className=" px-6 py-4 text-center  ">
                            {i + 1}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center  ">
                            {moment(item?.transaction_date).format('lll')}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-right  ">
                            {item?.note}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center  ">
                            {newFormatCurrency(
                              moneyType === 'AED'
                                ? item?.ingoing_purchase * USDTOAED
                                : item?.ingoing_purchase,
                              moneyType,
                            )}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center  ">
                            {newFormatCurrency(
                              moneyType === 'AED'
                                ? item?.outgoing_purchase * USDTOAED
                                : item?.outgoing_purchase,
                              moneyType,
                            )}
                          </th>
                          <th scope="row" className=" px-6 py-4 text-center  ">
                            {newFormatCurrency(
                              moneyType === 'AED'
                                ? getTotalForLine(i) * USDTOAED
                                : getTotalForLine(i),
                              moneyType,
                            )}
                          </th>
                        </tr>
                      );
                    })}
                    {index === arrayObject.length - 1 && (
                      <>
                        <tr className=" w-full  border-stone-700 bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 "></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 text-center text-neutral-500">
                            نزیکردنەوە
                          </td>
                          <td className="px-6 text-center text-neutral-500">
                            0.5
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {index === arrayObject.length - 1 && (
              <>
                <div className="rtl mt-16 flex w-full flex-row px-40">
                  <div className="flex w-1/2 flex-col  justify-between gap-5">
                    <div className="flex flex-row-reverse justify-between ">
                      <p className="w-1/2 text-right text-3xl ">: کۆی گشتی </p>
                      <p className="text-3xl font-bold">
                        {Math.round(total)} {moneyType === 'AED' ? 'AED' : '$'}
                      </p>
                    </div>
                    <div className="flex flex-row-reverse justify-between ">
                      <p className="w-1/2 text-right text-3xl ">
                        : کۆی گشتی حساب
                      </p>
                      <p className="text-3xl font-bold">
                        {Math.round(
                          moneyType === 'IQD'
                            ? acountTotal * USDTOAED
                            : acountTotal,
                        )}{' '}
                        {moneyType === 'IQD' ? 'IQD' : '$'}
                      </p>
                    </div>
                    {/* <div className="flex flex-col items-start gap-2 ">
                      <p className="w-1/2 text-right text-3xl">
                        کۆی گشتی بە وشە :{' '}
                      </p>
                      <p className="text-2xl font-bold"></p>
                    </div> */}
                  </div>
                </div>
              </>
            )}

            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                {/* <div className="flex flex-col items-start">
                  <h1>تێبینی</h1>
                  <p>-------------------</p>
                </div> */}
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function BoxInvo({ data, USDTOAED }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  // console.log(data);

  const transactionLength = data?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));

  const [total, setTotal] = useState();

  useEffect(() => {
    const totalPurchase = data.reduce((total, item) => total + item.total, 0);

    setTotal(newFormatCurrency(totalPurchase, 'USD'));
  }, []);

  return (
    <>
      {arrayObject?.map((item, index) => {
        return (
          <div className="flex h-[383mm] flex-col ">
            <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col  items-center justify-center gap-4">
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-5xl  leading-tight"> بەروار :</h1>
                  <h1 className="mr-auto text-5xl  leading-tight">
                    {formattedDate}
                  </h1>
                </div>
              </div>
            </div>
            <div className="rtl mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">کۆمپانیای مدينة الهواتف </h1>
                <div className=" w-fit text-right">
                  <p>
                    سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                    <br /> شەقامی مەولەوی
                  </p>
                  <p>سلێمانی</p>
                  <p>كوردستان العراق</p>
                </div>
              </div>
            </div>

            <div className="mt-20 px-40">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-[2%] px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="w-[35%] px-6  py-3">
                        تێبینی
                      </th>
                      <th scope="col" className="w-[20%] px-6 py-3 text-center">
                        دەرهێنان لە سنووق
                      </th>
                      <th scope="col" className="w-[15%] px-6 py-3 text-center">
                        خستنە ناو سنووق
                      </th>
                      <th scope="col" className="w-[14%] px-6 py-3 text-center">
                        بەروار
                      </th>
                      <th scope="col" className="w-[20%] px-6 py-3 text-center">
                        کۆی گشتی
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.slice(item.first, item.last).map((item, i) => {
                      return (
                        <tr
                          className={`${
                            i % 2 === 0 && 'bg-stone-100'
                          } border-b  text-2xl text-black`}
                        >
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {i + 1}
                          </th>
                          <th scope="row" className=" break-all px-6 py-4  ">
                            {item?.note}
                          </th>
                          <td className="px-6 py-4 text-center">
                            {newFormatCurrency(item?.withdrawal, 'USD')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {newFormatCurrency(item?.deposit, 'USD')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.transaction_date}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.total}
                          </td>
                        </tr>
                      );
                    })}
                    {index === arrayObject.length - 1 && (
                      <tr className="w-full border-b-[1px] border-t-2 border-stone-700  bg-white text-2xl text-black ">
                        <td className="px-6 py-4 text-center"></td>
                        <td className="px-6 py-4 text-center"></td>
                        <td className="px-6 py-4 text-center"></td>
                        <td className="px-6 py-4 text-center"></td>
                        <td className="px-6 py-4 text-center font-bold">
                          کۆی گشتی
                        </td>
                        <td className="px-6 py-4 text-center">{total}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {index === arrayObject.length - 1 && (
              <div className="rtl mt-16 flex w-full flex-row px-40">
                <div className="flex w-1/3 flex-col  justify-between gap-5">
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl ">: کۆی گشتی </p>
                    <p className="text-5xl font-bold">{total}</p>
                  </div>
                  {/* <div className="flex flex-col items-start gap-2 ">
                    <p className="w-1/2 text-right text-3xl">
                      کۆی گشتی بە وشە :{' '}
                    </p>
                    <p className="text-2xl font-bold"></p>
                  </div> */}
                </div>
              </div>
            )}
            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                {/* <div className="flex flex-col items-start">
                  <h1>تێبینی</h1>
                  <p>-------------------</p>
                </div> */}
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function AllDebtInvo({ data, USDTOAED }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  const transactionLength = data?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));
  // console.log(data?.reduce((total, item) => total + item?.total, 0));
  return (
    <>
      {arrayObject?.map((item, index) => {
        return (
          <div className="flex h-[383mm] flex-col ">
            <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col  items-center justify-center gap-4">
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-5xl  leading-tight"> بەروار :</h1>
                  <h1 className="mr-auto text-5xl  leading-tight">
                    {formattedDate}
                  </h1>
                </div>
              </div>
            </div>
            <div className="rtl mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">کۆمپانیای مدينة الهواتف </h1>
                <div className=" w-fit text-right">
                  <p>
                    سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                    <br /> شەقامی مەولەوی
                  </p>
                  <p>سلێمانی</p>
                  <p>كوردستان العراق</p>
                </div>
              </div>
            </div>

            <div className="mt-20 px-40">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-[2%] px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="w-1/3 px-6  py-3">
                        ناو
                      </th>
                      <th scope="col" className="w-1/3 px-6 py-3 text-center">
                        بڕی قەرز بە دۆلار
                      </th>
                      <th scope="col" className="w-1/3 px-6 py-3 text-center">
                        بڕی قەرز بە درهەم
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.slice(item.first, item.last).map((item, i) => {
                      return (
                        <tr
                          className={` ${
                            i % 2 === 0 && 'bg-stone-100'
                          } border-b  text-2xl text-black`}
                        >
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {i + 1}
                          </th>
                          <th scope="row" className=" px-6 py-4   ">
                            {item?.debtor_name ||
                              item?.company_name ||
                              item?.seller_name ||
                              item?.sname}
                          </th>
                          <td className="px-8 py-4 text-center">
                            <div className="flex items-center justify-between px-8 font-bold">
                              <span>
                                {formatCurrencyWithoutType(
                                  item?.total || item?.npurchase || 0,
                                )}
                              </span>
                              <span>$</span>
                            </div>
                          </td>
                          <td className=" px-8 py-4 text-center ">
                            <div className="flex items-center justify-between px-8 font-bold">
                              <span>
                                {formatCurrencyWithoutType(
                                  item?.total
                                    ? item?.total * USDTOAED
                                    : item?.npurchase
                                      ? item?.npurchase * USDTOAED
                                      : 0,
                                )}
                              </span>

                              <span>AED</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className={`border-b  text-2xl text-black`}>
                      <th scope="row" className=" px-6 py-4 text-center   ">
                        16
                      </th>
                      <th scope="row" className=" px-6 py-4   ">
                        کۆی گشتی
                      </th>
                      <td className="px-8 py-4 text-center  ">
                        <div className="flex items-center justify-between px-8 font-bold">
                          <span>
                            {formatCurrencyWithoutType(
                              data.reduce(
                                (total, item) => total + item?.total,
                                0,
                              ),
                            )}
                          </span>
                          <span>$</span>
                        </div>
                      </td>
                      <td className=" px-8 py-4 text-center">
                        <div className="flex items-center justify-between px-8 font-bold">
                          <span>
                            {formatCurrencyWithoutType(
                              data.reduce(
                                (total, item) => total + item?.total,
                                0,
                              ) * USDTOAED,
                            )}
                          </span>
                          <span>AED</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                {/* <div className="flex flex-col items-start">
                  <h1>تێبینی</h1>
                  <p>-------------------</p>
                </div> */}
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function GetDebtInvo({ data, USDTOAED, startAt }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  const transactionLength = data?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));

  const [total, setTotal] = useState();

  useEffect(() => {
    const totalPurchase = data.reduce(
      (total, item) => total + (item.ingoing_purchase - item.outgoing_purchase),
      startAt ? startAt : 0,
    );

    setTotal(newFormatCurrency(totalPurchase, 'USD'));
  }, []);
  return (
    <>
      {arrayObject?.map((item, index) => {
        return (
          <div className="flex h-[383mm] flex-col ">
            <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
            </div>
            <div className="rtl mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">کۆمپانیای مدينة الهواتف </h1>
                <div className=" w-fit text-right">
                  <p>
                    سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                    <br /> شەقامی مەولەوی
                  </p>
                  <p>سلێمانی</p>
                  <p>كوردستان العراق</p>
                </div>
              </div>
            </div>
            <div className="rtl rtl mt-10 flex flex-row-reverse items-end justify-between px-40">
              <div className="flex w-1/3 flex-col  justify-between gap-3">
                <div className="flex flex-row justify-between ">
                  <p className="w-1/2 text-right text-2xl">
                    {' '}
                    بەرواری کەشف حساب :{' '}
                  </p>
                  <p className="text-2xl">{formattedDate}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <h1 className="text-2xl">حسابی بەڕێز</h1>
                <p className="text-3xl font-bold">
                  {data[0]?.debtor?.debtor_name}
                </p>
              </div>
            </div>
            <div className="mt-6 px-40">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-[2%] px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="w-[22%] px-6  py-3">
                        تێبینی
                      </th>
                      <th scope="col" className="w-[%] px-6 py-3 text-center">
                        بەروار
                      </th>
                      <th scope="col" className="w-[%] px-6 py-3 text-center">
                        بەرواری گەڕاندنەوە
                      </th>
                      <th scope="col" className="w-[%] px-6 py-3 text-center">
                        پارەی گەڕێندراوە
                      </th>
                      <th scope="col" className="w-[%] px-6 py-3 text-center">
                        پارەی قەرز کراو
                      </th>
                      <th scope="col" className="w-[%] px-6 py-3 text-center">
                        کۆی گشتی
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.slice(item.first, item.last).map((item, i) => {
                      return (
                        <tr
                          className={`${
                            i % 2 === 0 && 'bg-stone-100'
                          } border-b  text-2xl text-black`}
                        >
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {i + 1}
                          </th>
                          <th
                            scope="row"
                            className=" w-12 break-all  px-6 py-4 text-[12px] "
                          >
                            {item?.note}
                          </th>
                          <td className="px-6 py-4 text-center">
                            {moment(item?.transaction_date).format('lll')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.returning_date}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {newFormatCurrency(item?.outgoing_purchase, 'USD')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {newFormatCurrency(item?.ingoing_purchase, 'USD')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {newFormatCurrency(item?.total_purchase, 'USD')}
                          </td>
                        </tr>
                      );
                    })}
                    {index === arrayObject.length - 1 && (
                      <tr className="w-full border-b-[1px] border-t-2 border-stone-700  bg-white text-2xl text-black ">
                        <td className="px-6 py-4 text-center"></td>
                        <td className="px-6 py-4 text-center"></td>
                        <td className="px-6 py-4 text-center"></td>
                        <td className="px-6 py-4 text-center"></td>
                        <td className="px-6 py-4 text-center"></td>
                        <td className="px-6 py-4 text-center font-bold">
                          کۆی نرخ
                        </td>
                        <td className="px-6 py-4 text-center">{total}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {index === arrayObject.length - 1 && (
              <div className="rtl mt-16 flex w-full flex-row px-40">
                <div className="flex w-1/3 flex-col  justify-between gap-5">
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl ">: کۆی گشتی </p>
                    <p className="text-3xl font-bold">{total}</p>
                  </div>
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl font-bold">
                      : باڵانس
                    </p>
                    <p className="text-3xl font-bold">{total}</p>
                  </div>
                  {/* <div className="flex flex-col items-start gap-2 ">
                    <p className="w-1/2 text-right text-3xl">
                      کۆی گشتی بە وشە :{' '}
                    </p>
                    <p className="text-2xl font-bold"></p>
                  </div> */}
                </div>
              </div>
            )}
            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                {/* <div className="flex flex-col items-start">
                  <h1>تێبینی</h1>
                  <p>-------------------</p>
                </div> */}
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function DashBoard({ data, USDTOAED }) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const dayInText = currentDate.toLocaleDateString('ku', { weekday: 'long' });

  return (
    <>
      <div className="flex h-[383mm] flex-col ">
        <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
          <div>
            <img src={Logo} alt="logo" className="w-80 " />
          </div>
          <div className=" flex flex-col  items-center justify-center gap-4">
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-5xl  leading-tight"> بەروار :</h1>
              <h1 className="mr-auto text-5xl  leading-tight">
                {formattedDate}
              </h1>
            </div>
            <p className="mr-auto">کەشف حسابی ڕۆژانە</p>
          </div>
        </div>
        <div className="rtl mt-3 flex flex-row justify-between px-40">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-5xl font-bold">کۆمپانیای مدينة الهواتف </h1>
            <div className=" w-fit text-right">
              <p>
                سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                <br /> شەقامی مەولەوی
              </p>
              <p>سلێمانی</p>
              <p>كوردستان العراق</p>
            </div>
          </div>
        </div>

        <div className="mt-10 px-40">
          <div className="relative overflow-x-auto">
            <table className="rtl w-full text-left text-sm text-gray-500  ">
              <thead className="bg-stone-700 text-2xl uppercase text-white ">
                <tr className="divide-x-[1px]">
                  <th scope="col" className="w-[25%] px-6 py-3 text-right ">
                    بەروار
                  </th>
                  <th scope="col" className="w-[75%] px-6 py-3 text-right">
                    <p className="flex w-full flex-row justify-between">
                      <span>{formattedDate}</span>
                      <span>{dayInText}</span>
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-b bg-stone-100 text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    پارەی ناو سندووق
                  </th>
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    {formatCurrency(data?.boxmoney)}
                  </th>
                </tr>
                <tr className="border-b bg-white text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    جرد مخزن
                  </th>
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    {formatCurrency(data?.inventory)}
                  </th>
                </tr>
                <tr className="border-b bg-stone-100 text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    قەرزی ئێمە لای کڕیار
                  </th>
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    {formatCurrency(data?.ourloan)}
                  </th>
                </tr>
                <tr className="border-b bg-white text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    قەرزی فرۆشیار لای ئێمە
                  </th>
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    {formatCurrency(data?.customerloan)}
                  </th>
                </tr>
                <tr className="border-b bg-stone-100 text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    کۆی دەستمایەی دوێنی
                  </th>
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    {formatCurrency(data?.yesterdayMoney)}
                  </th>
                </tr>
                <tr className="border-b bg-white text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    کۆی دەستمایەی ئەمڕۆ
                  </th>
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    {formatCurrency(data?.todayMoney)}
                  </th>
                </tr>
                <tr className="border-b bg-stone-100 text-2xl text-black">
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    جیاوازی دەست مایە
                  </th>
                  <th scope="row" className=" px-6 py-4 text-right   ">
                    <p className="flex w-full flex-row justify-between">
                      <span>{formatCurrency(data?.allMoney)}</span>
                      <span>قازانج</span>
                    </p>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-auto flex flex-row px-40">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-start">
              <h1>تێبینی</h1>
              <p>-------------------</p>
            </div>
            <div>
              <img src={Mor} alt="logo" className="w-80 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function newFormatCurrency(value, type) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: type,
    minimumFractionDigits: 1,
  }).format(Math.round(value));
}
// can we get it without currecny type
function formatCurrencyWithoutType(value) {
  // this uses currency type , i dont want the $ sign
  return new Intl.NumberFormat('en', {
    minimumFractionDigits: 1,
  }).format(value);
}
function formatCurrencyWithoutRound(value, type) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: type,
    minimumFractionDigits: 1,
  }).format(value);
}

function InventoryInvo({ data, USDTOAED }) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`;

  const transactionLength = data?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));

  return (
    <>
      {arrayObject?.map((item, index) => {
        return (
          <div className="flex h-[383mm] flex-col ">
            <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col  items-center justify-center gap-4">
                <div className="flex flex-row items-center gap-3">
                  <h1 className="text-5xl  leading-tight"> بەروار :</h1>
                  <h1 className="mr-auto text-5xl  leading-tight">
                    {formattedDate}
                  </h1>
                </div>
              </div>
            </div>
            <div className="rtl mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">کۆمپانیای مدينة الهواتف </h1>
                <div className=" w-fit text-right">
                  <p>
                    سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                    <br /> شەقامی مەولەوی
                  </p>
                  <p>سلێمانی</p>
                  <p>كوردستان العراق</p>
                </div>
              </div>
            </div>

            <div className="mt-20 px-40">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-1/3 px-6  py-3 text-center">
                        نرخی کاڵا
                      </th>
                      <th scope="col" className="w-1/3 px-6 py-3 text-center">
                        بڕی ماوە
                      </th>
                      <th scope="col" className="w-1/3 px-6 py-3 text-right">
                        ناوی کاڵا
                      </th>
                      <th scope="col" className="w-[2%] px-6 py-3 text-center">
                        #
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.slice(item.first, item.last).map((item, i) => {
                      return (
                        <tr
                          className={` ${
                            i % 2 === 0 && 'bg-stone-100'
                          } border-b  text-2xl text-black`}
                        >
                          <th scope="row" className=" px-6 py-4   text-center ">
                            {newFormatCurrency(item?.item_price, 'USD')}
                          </th>
                          <td className="px-6 py-4 text-center">
                            {item?.item_quantity}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.item_name}
                          </td>
                          <th scope="row" className=" px-6 py-4 text-center   ">
                            {i + 1}
                          </th>
                        </tr>
                      );
                    })}
                    <tr className={` border-b  text-2xl text-black`}>
                      <td className="px-6 py-4 text-center">
                        {data?.reduce(
                          (total, item) => total + item?.item_price,
                          0,
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {data?.reduce(
                          (total, item) => total + item?.item_quantity,
                          0,
                        )}
                      </td>

                      <td className="px-6 py-4 text-center">كۆی گشتی</td>
                      <th scope="row" className=" px-6 py-4 text-center">
                        16
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                <div className="flex flex-col items-start">
                  <h1>تێبینی</h1>
                  <p>-------------------</p>
                </div>
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function ShareInvoice({
  data,
  moneyType,
  USDTOAED,
  capitalData,
  ownerName,
  totalValuePerOwner,
  MoneyValue,
}) {
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  useEffect(() => {
    let totalQTY = 0;
    let totalPrice = 0;
    data?.areayOfItems?.map(item => {
      totalQTY += Number(item?.item_quantity);
      totalPrice += item?.total_price;
    });
    setTotalQty(totalQTY);
    setTotalPrice(totalPrice);
  }, [data]);

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const transactionLength = data?.length;
  const numOfPages = Math.ceil(transactionLength / 15);

  const arrayObject = Array.from({ length: numOfPages }, (_, index) => ({
    first: index * 15,
    last: (index + 1) * 15,
  }));

  return (
    <>
      {arrayObject?.map((item, i) => {
        return (
          <div className="flex h-[383mm] flex-col font-bold">
            <div className=" rtl  flex w-full flex-row justify-between  px-40 ">
              <div>
                <img src={Logo} alt="logo" className="w-80 " />
              </div>
              <div className=" flex flex-col items-center justify-center gap-4">
                <h1 className="text-6xl ">کۆی گشتی حساب</h1>
                <h1 className="mr-auto text-5xl ">
                  {newFormatCurrency(totalValuePerOwner, 'USD')}
                </h1>
              </div>
            </div>
            <div className="rtl mt-3 flex flex-row justify-between px-40">
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold">کۆمپانیای مدينة الهواتف </h1>
                <div className="w-fit text-right text-3xl">
                  <p>
                    سیروانی نوێ نهۆمی دووەم دوکانی ژمارە ١٤-١٥
                    <br /> شەقامی مەولەوی
                  </p>
                  <p>سلێمانی</p>
                  <p>كوردستان العراق</p>
                </div>
              </div>
              {/* <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold">بڕی پارە</h1>
                <p className="ltr text-5xl font-bold">
                  {newFormatCurrency(moneyType === 'AED' ? data?.total * USDTOAED : data?.total,moneyType)}{' '}
                  
                </p>
              </div> */}
            </div>
            <div className="rtl rtl mt-10 flex flex-row-reverse justify-between px-40">
              <div className="flex w-1/3 flex-col  justify-between gap-3">
                <div className="flex-row= flex justify-between ">
                  <p className="w-1/2 text-right text-2xl">بەرواری کەشف حساب</p>
                  <p className="text-2xl">{formattedDate}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <h1 className="text-righ ml-auto text-3xl">هەژماری </h1>
                <p className="mt-5 text-4xl font-bold">{ownerName}</p>
              </div>
            </div>
            <div className="mt-6 px-40">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500  ">
                  <thead className="bg-stone-700 text-2xl uppercase text-white ">
                    <tr className="divide-x-[1px]">
                      <th scope="col" className="w-[2%] px-6 py-3 text-center">
                        #
                      </th>
                      <th scope="col" className="w-[15%] px-6 py-3 text-center">
                        بەروار
                      </th>
                      <th scope="col" className="w-[30%] px-6 py-3 ">
                        تێبینی
                      </th>
                      <th scope="col" className="w-[15%] px-6 py-3 text-center">
                        پارەی ڕاکێشراو
                      </th>
                      <th scope="col" className="w-[25%] px-6 py-3 text-center">
                        پارەی هێنراو
                      </th>
                      <th scope="col" className="w-[25%] px-6 py-3 text-center">
                        کۆی گشتی
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data?.slice(item.first, item.last)?.map((item, i) => {
                      return (
                        <tr
                          key={i}
                          className="border-b bg-white text-2xl text-black"
                        >
                          <th scope="row" className=" px-6 py-4 text-center  ">
                            {i + 1}
                          </th>
                          <th scope="row" className=" px-6 py-4  ">
                            {item?.transaction_date}
                          </th>
                          <td className="px-6 py-4 text-right">{item?.note}</td>
                          <td className="px-6 py-4 text-center">
                            {newFormatCurrency(item?.withdrawal, 'USD')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {newFormatCurrency(item?.deposit, 'USD')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {newFormatCurrency(item?.total, 'USD')}
                          </td>
                        </tr>
                      );
                    })}
                    {i === arrayObject.length - 1 && (
                      <>
                        <tr className="w-full border-b-[1px] border-t-2 border-stone-700  bg-white text-2xl text-black ">
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center"></td>
                          <td className="px-6 py-4 text-center font-bold">
                            کۆی نرخ
                          </td>
                          <td className="px-6 py-4 text-center">
                            {newFormatCurrency(MoneyValue, 'USD')}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {i === arrayObject.length - 1 && (
              <div className="rtl mt-16 flex w-full flex-row px-40">
                <div className="flex w-1/2 flex-col  justify-between gap-9">
                  <div className="flex flex-row-reverse justify-between ">
                    <p className="w-1/2 text-right text-3xl ">: کۆی گشتی </p>
                    <p className="ltr text-3xl font-bold">
                      {newFormatCurrency(totalValuePerOwner, 'USD')}{' '}
                    </p>
                  </div>

                  {/* <div className="gap- flex flex-col items-start ">
                    <p className="w-1/2 text-right text-3xl">
                      کۆی گشتی بە وشە :
                    </p>
                    <p className="text-2xl font-bold"></p>
                  </div> */}
                </div>
              </div>
            )}
            <div className="mt-auto flex flex-row px-40">
              <div className="flex flex-col gap-14">
                {/* <div className="flex flex-col items-start text-lg">
                  <h1>تێبینی</h1>
                  <p>{data?.note}</p>
                </div> */}
                <div>
                  <img src={Mor} alt="logo" className="w-80 " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}