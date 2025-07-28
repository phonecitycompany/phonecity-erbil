import React from 'react';
// import { format } from 'date-fns';

import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';
function TransactionPurcheseRow({
  item: { id, item_id, sold_item_quantity, sold_item_price, inventory },
}) {
  return (
    <Table.Row className="border-t  border-gray-200">
      <p className="text-xl 2xl:text-3xl">
        {formatCurrency(sold_item_price * sold_item_quantity)}
      </p>
      <p className="text-xl 2xl:text-3xl">{formatCurrency(sold_item_price)}</p>

      <p className="text-xl 2xl:text-3xl">{sold_item_quantity}</p>

      <p className="text-xl 2xl:text-3xl">{inventory?.item_name}</p>
    </Table.Row>
  );
}

export default TransactionPurcheseRow;
