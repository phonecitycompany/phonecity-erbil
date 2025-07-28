import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getPartnersTransaction({
  page,
  sortBy,
  partnerId = '',
  filterByDate,
  dateBetween,
  bewlowDateValue,
}) {
  let query = supabase
    .from('partners_transaction')
    .select('*', { count: 'exact' })
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
  if (partnerId !== null && partnerId !== undefined) {
    query = query.eq('partner_id', partnerId);
  } else {
    // If partnerId is null or undefined, return an empty array with count 0
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
export async function getAllPartnersTransaction() {
  let query = supabase
    .from('partners_transaction')
    .select('*', { count: 'exact' });

  const { error, data, count } = await query;

  if (error || !data) {
    console.error(error);

    throw new Error('کاڵاکان نەدۆزرانەوە');
  }

  return { data, count };
}

export async function deletePartnersTransaction(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from('partners_transaction')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('transaction item could not be deleted');
  }
  return data;
}

export async function editPartnersTransaction({ newTransaction, id }) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('partners_transaction');

  query = query.update([newTransaction]).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Transaction could not be edited');
  }
  return data;
}
export async function AddPartnersTransaction(newTransaction) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('partners_transaction');

  query = query.insert([newTransaction]);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Transaction could not be added');
  }
  return data;
}
