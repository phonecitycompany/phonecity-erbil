import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getTransactionPurcheses({ page, transactionItamId }) {
  let query = supabase
    .from('transaction_purchases')
    .select(
      'transaction_id , sold_item_quantity , id , sold_item_price , inventory (item_name)',
      { count: 'exact' },
    )
    .order('id', { ascending: true })
    .eq('transaction_id', transactionItamId);

  // if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  // if (sortBy)
  //   query = query.order(sortBy.field, {
  //     ascending: sortBy.direction === 'asc',
  //   });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query.range(from, to);
  }

  const { error, data, count } = await query;

  if (error || !data) {
    console.error(error);

    throw new Error('کاڵاکان نەدۆزرانەوە');
  }

  return { data, count };
}

export async function deleteTransactionItem(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from('transaction_purchases')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('transaction item could not be deleted');
  }
  return data;
}
export async function AddTransactionPurchease(newTransaction) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from('transaction_purchases')
    .insert(newTransaction);

  if (error) {
    console.error(error);
    throw new Error('transaction purchease could not be added');
  }
  return data;
}