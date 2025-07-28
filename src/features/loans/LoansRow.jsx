import React from 'react';
// import { format } from 'date-fns';

import Table from '../../ui/Table';
import {
  formatCurrency,
  delimiter,
  newFormatCurrency,
} from '../../utils/helpers';
import useSettings from '../settings/useSettings';

function LoansRow({ data }) {
  // const { checkout, isCheckingOut } = useCheckout();
  const { error, isLoading, settings: { USDTOAED } = {} } = useSettings();
  isLoading && <p>loading</p>;
  return (
    <Table.Row className="border-t border-gray-200">
      <div className="flex items-center justify-center text-xl 2xl:text-3xl">
        <span>
          {newFormatCurrency(
            (data?.npurchase ? data?.npurchase : data?.total || 0) * USDTOAED,
          )}
        </span>{' '}
        <span className="ml-2">AED</span>{' '}
      </div>

      <p className="text-xl 2xl:text-3xl">
        {formatCurrency(data?.npurchase ? data?.npurchase : data?.total)}
      </p>

      <p className="text-xl 2xl:text-3xl">
        {data?.company_name
          ? data?.company_name
          : data?.seller_name
            ? data?.seller_name
            : data?.debtor_name
              ? data?.debtor_name
              : data?.sname}
      </p>
    </Table.Row>
  );
}

export default LoansRow;
