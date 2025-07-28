import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
export async function getVault({ page, filterByDate, dateBetween, sortBy }) {
  let query = supabase
    .from('vault')
    .select('*', { count: 'exact' })
    .order(sortBy.field, { ascending: sortBy.direction });

  if (filterByDate) {
    query = query.eq('transaction_date', filterByDate);
  } else if (dateBetween?.startDate && dateBetween?.endDate) {
    query = query
      .gte('transaction_date', dateBetween.startDate)
      .lte('transaction_date', dateBetween.endDate);
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query.range(from, to);
  }

  const { error, data, count } = await query;
  if (error || !data) {
    console.error(error);

    throw new Error('کڕیارەکان نەدۆزرانەوە');
  }

  return { data, count };
}

export async function addVault(newVaultItem) {
  // create / edit : cabin
  let query = supabase.from('vault');

  // A : create cabin
  // if (id) console.log(id);
  query = query.insert([newVaultItem]);

  // B : edit cabin
  // if (id) query = query.update(newVaultItem).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);

    throw new Error('کڕیارەکە زیاد نەکرا');
  }

  return data;
}

export async function editVault({ newVaultItem, id }) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('vault');

  query = query.update([newVaultItem]).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Seller could not be edited');
  }
  return data;
}
export async function deleteVault(id) {
  const { data, error } = await supabase.from('vault').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Seller could not be deleted');
  }
  return data;
}
export async function getallaults() {
  let query = supabase.from('vault').select('*', { count: 'exact' });

  const { error, data, count } = await query;

  if (error || !data) {
    console.error(error);

    throw new Error('کڕیارەکان نەدۆزرانەوە');
  }

  return { data, count };
}

// create a function that gets a value then removes all datas from the table after removing adds one row with the datas we passed to it
export async function RemoveAlladdVaults({ newItem, old }) {
  let query = supabase.from('vault');

  query = query.delete().in('id', old);

  const { error } = await query;

  if (error) {
    console.error(error);

    throw new Error('کڕیارەکە زیاد نەکرا');
  }

  return addVault(newItem);
}