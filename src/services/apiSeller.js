import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
import { useSearchParams } from 'react-router-dom';

export async function getSellerItems({ filter }) {
  let query = supabase
    .from('sellers')
    .select('*', { count: 'exact' })
    .eq('type', filter)
    .order('id', { ascending: true });

  // if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  // if (sortBy)
  //   query = query.order(sortBy.field, {
  //     ascending: sortBy.direction === 'asc',
  //   });

  const { error, data, count } = await query;

  if (error || !data) {
    console.error(error);

    throw new Error('کڕیارەکان نەدۆزرانەوە');
  }

  return { data, count };
}

export async function AddSeller(newSeller) {
  // create / edit : cabin
  let query = supabase.from('sellers');

  // A : create cabin
  // if (id) console.log(id);
  query = query.insert([newSeller]);

  // B : edit cabin
  // if (id) query = query.update(newSeller).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);

    throw new Error('کڕیارەکە زیاد نەکرا');
  }

  return data;
}

export async function editSellerItem({ newSeller, id }) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('sellers');

  query = query.update([newSeller]).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Seller could not be edited');
  }
  return data;
}
export async function deleteSellerItem(id) {
  const { data, error } = await supabase.from('sellers').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Seller could not be deleted');
  }
  return data;
}
export async function getSingleSeller(sellerId) {
  if (!sellerId) return {};

  const { data, error } = await supabase
    .from('sellers')
    .select('total')
    .eq('id', sellerId)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Seller could not be fetched');
  }
  return data;
}