import Partnerlist from './Partnerlist';
import { useGetCapital } from './useGetCapital';
import { useGetPartners } from './useGetPartners';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import FilterPartnersTransaction from './FilterPartnersTransaction';
import Row from '../../ui/Row';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ReciveMoneyForm from './ReciveMoneyForm';
import AddMoneyTransaction from './AddMoneyTransaction';
import TransactionTable from './Transactiontable';
import { useGetPartnersTransaction } from './useGetTransaction';
import { formatCurrency } from '../../utils/helpers';
import { ca } from 'date-fns/locale';
import CalculateEarnAmount from './calculateEarnAmount';
import { useUserforButtons } from '../authentication/useUserForButtons';
import { IoIosCloseCircle } from 'react-icons/io';
import SingleInvoice from '../../pages/SingleInvoice';
ChartJS.register(ArcElement, Tooltip);

export default function OwnerShip() {
  const { partnersData, isLoading, count } = useGetPartners();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = searchParams.get('partner')
    ? searchParams.get('partner')
    : undefined;
  const [partnerId, setPartnerId] = useState(searchParamsValue);
  const {
    capitalData,
    isLoading: isLoadingCapital,
    count: isloadningCount,
  } = useGetCapital();
  const {
    isLoading: transactionLoading,
    count: transactionCount,
    transactionItems,
  } = useGetPartnersTransaction();
  const { isAdmin } = useUserforButtons();
  const [showInvoice, setShowInvoice] = useState(false);
  const [shareData, setShareData] = useState();

  useEffect(() => {
    setShareData(partnersData?.find(partner => partner.id == partnerId));
  }, []);

  if (isLoading) return <div>loading...</div>;
  function getTotalForOwners() {
    return partnersData.reduce((total, item) => total + item.total, 0);
  }
  const data = {
    labels: partnersData?.map(partner => partner.Partner_name),
    datasets: [
      {
        label: 'Percent',
        data: partnersData?.map(partner => partner.share * 100),
        backgroundColor: ['#006AFF', '#99C3FF', '#CBC1FF', '#FF6666'],
        borderColor: ['#006AFF', '#99C3FF', '#CBC1FF', '#FF6666'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className=" ">
      {showInvoice && (
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gray-100">
          <div className="rtl  p-7">
            <IoIosCloseCircle
              onClick={() => {
                setShowInvoice(false);
              }}
              className="cursor-pointer text-7xl text-main"
            />
          </div>
          <SingleInvoice
            type="share"
            data={transactionItems}
            setShowInvoice={setShowInvoice}
            ownerName={
              partnersData?.find(partner => partner.id == partnerId)
                ?.Partner_name
            }
            capitalData={capitalData}
            MoneyValue={
              partnersData?.find(partner => partner.id == partnerId)?.total
            }
            totalValuePerOwner={
              partnersData?.find(partner => partner.id == partnerId)?.total +
              capitalData?.value *
                partnersData?.find(partner => partner.id == partnerId)?.share
            }
          />
        </div>
      )}
      <div className="flex min-h-[25rem] w-full flex-col items-end space-y-10 rounded-2xl bg-white px-4 py-6 xl:flex-row xl:items-start xl:space-y-0">
        <div className="relative flex h-80 w-80 flex-shrink-0 flex-col items-center justify-center">
          <Doughnut data={data} />
          <div className="relative mt-5">
            {formatCurrency(capitalData?.value)}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-6 text-4xl">خاوەن پشکەکان</h3>
          <div className="flex flex-col items-end space-y-4">
            {partnersData.map(partner => {
              return (
                <div
                  className="relative flex  w-[30rem] items-center justify-end"
                  key={partner.id}
                >
                  <div className="absolute left-0 top-0">
                    %{partner?.share * 100}
                  </div>
                  <div className=" mr-2 ">{partner?.Partner_name}</div>
                  <div className="h-5 w-5 rounded-full bg-main"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-end ">
        <Row className=" mb-6 w-full !gap-4" type="horizontal">
          <div className=" flex flex-row gap-4 ">
            <Modal>
              {isAdmin && (
                <Modal.Open opens="reciveMoney">
                  <Button className="px-3 text-base xl:text-xl 2xl:px-5 2xl:text-2xl">
                    ڕاکێشانی پارە
                  </Button>
                </Modal.Open>
              )}
              {isAdmin && (
                <Modal.Open opens="addMoney">
                  <Button className="px-3 text-base xl:text-xl 2xl:px-5 2xl:text-2xl">
                    هێنانەوەی پارە
                  </Button>
                </Modal.Open>
              )}

              <Modal.Window name="reciveMoney">
                <ReciveMoneyForm partnerId={partnerId} />
              </Modal.Window>

              <Modal.Window name="addMoney">
                <AddMoneyTransaction partnerId={partnerId} />
              </Modal.Window>
            </Modal>
            <FilterPartnersTransaction />
          </div>

          <Partnerlist
            partnerItems={partnersData}
            partnerId={partnerId}
            setPartnerId={setPartnerId}
          />
        </Row>
      </div>
      <div className="flex w-full space-x-8 xl:space-x-12">
        <CalculateEarnAmount
          partnersData={partnersData}
          partnerId={partnerId}
        />
        <div className="w-full">
          <TransactionTable
            partnerId={partnerId}
            transactionItems={transactionItems}
            isLoading={transactionLoading}
            count={transactionCount}
          />
        </div>
      </div>
      <div className="flex items-center space-x-5">
        {partnersData?.find(partner => partner.id == partnerId) && (
          <div className="mt-6 flex flex-1 items-center justify-between rounded-2xl bg-white p-4">
            <div className="">
              {formatCurrency(
                partnersData?.find(partner => partner.id == partnerId)?.total +
                  capitalData?.value *
                    partnersData?.find(partner => partner.id == partnerId)
                      ?.share,
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="">لە ئێستادا</div>
              <div className="">
                {
                  partnersData?.find(partner => partner.id == partnerId)
                    ?.Partner_name
                }
              </div>
              <div className="">{`کۆی دەستمایەی`}</div>
            </div>
          </div>
        )}
        {partnersData?.find(partner => partner.id == partnerId) && (
          <div className="mt-6 flex flex-1 items-center justify-between rounded-2xl bg-white p-4">
            <div className="">
              {formatCurrency(
                Math.abs(
                  partnersData?.find(partner => partner.id == partnerId)?.total,
                ),
              )}
            </div>
            <div className="">
              {partnersData?.find(partner => partner.id == partnerId)?.total > 0
                ? 'کۆی پارەی هێنراو'
                : 'کۆی پارەی دەرهێنراو'}
            </div>
          </div>
        )}
      </div>
      {searchParamsValue !== undefined && (
        <Button
          onClick={() => {
            setShowInvoice(true);
          }}
          className="mt-10 !duration-200 focus:!outline-none"
        >
          کەشف حساب
        </Button>
      )}
    </div>
  );
}
