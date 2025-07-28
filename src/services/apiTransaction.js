import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getTransactionItems({
  page,
  sortBy,
  sellerId = '',
  filterByDate,
  dateBetween,
  bewlowDateValue,
}) {
  let query = supabase
    .from('seller_transaction')
    .select('* , sellers(*)', { count: 'exact' })
    .order(sortBy.field, { ascending: sortBy.direction });

  if (filterByDate) {
    query = query.eq('transaction_date', filterByDate);
  } else if (
    dateBetween?.startDate &&
    dateBetween?.startDate &&
    dateBetween?.endDate &&
    dateBetween?.endDate
  ) {
    query = query
      .gte('transaction_date', dateBetween.startDate)
      .lte('transaction_date', dateBetween.endDate);
  } else if (bewlowDateValue) {
    query = query.lte('transaction_date', bewlowDateValue);
  }
  if (sellerId !== null && sellerId !== undefined) {
    query = query.eq('seller_id', sellerId);
  } else {
    // If sellerId is null or undefined, return an empty array with count 0
    return { data: [], count: 0 };
  }

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
export async function getAllTransactionItems() {
  let query = supabase
    .from('seller_transaction')
    .select('*', { count: 'exact' });

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
    .from('seller_transaction')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('transaction item could not be deleted');
  }
  return data;
}

export async function editTransactionItem({ newTransaction, id }) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('seller_transaction');

  query = query.update([newTransaction]).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Transaction could not be edited');
  }
  return data;
}
export async function AddSellerTransaction(newTransaction) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from('seller_transaction')
    .insert([newTransaction])
    .select('*')
    .single();

  if (error) {
    console.error(error);
    throw new Error('transaction item could not be added');
  }
  return data;
}
export async function getLastTransactionItem() {
  const { data, error } = await supabase
    .from('seller_transaction')
    .select('*')
    .order('id', { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    throw new Error('transaction item could not be added');
  }
  return data;
}
export async function gettotalforfilter({
  sortBy,
  sellerId = '',
  filterByDate,
  dateBetween,
  bewlowDateValue,
}) {
  let query = supabase
    .from('seller_transaction')
    .select('* , sellers(*)', { count: 'exact' })
    .order(sortBy.field, { ascending: sortBy.direction });

  if (filterByDate) {
    query = query.eq('transaction_date', filterByDate);
  } else if (
    dateBetween?.startDate &&
    dateBetween?.startDate &&
    dateBetween?.endDate &&
    dateBetween?.endDate
  ) {
    query = query
      .gte('transaction_date', dateBetween.startDate)
      .lte('transaction_date', dateBetween.endDate);
  } else if (bewlowDateValue) {
    query = query.lte('transaction_date', bewlowDateValue);
  }
  if (sellerId !== null && sellerId !== undefined) {
    query = query.eq('seller_id', sellerId);
  } else {
    // If sellerId is null or undefined, return an empty array with count 0
    return { data: [], count: 0 };
  }

  // if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  // if (sortBy)
  //   query = query.order(sortBy.field, {
  //     ascending: sortBy.direction === 'asc',
  //   });

  const { error, data, count } = await query;

  if (error || !data) {
    console.error(error);

    throw new Error('کاڵاکان نەدۆزرانەوە');
  }

  return { data, count };
}
