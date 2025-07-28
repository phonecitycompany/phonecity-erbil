import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getInventoryItems({ page, sortBy }) {
  console.log(sortBy);
  let query = supabase
    .from('inventory')
    .select('*', { count: 'exact' })
    .order(sortBy.field, { ascending: sortBy.direction });

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
export async function getAllInventoryItems({ sortBy }) {
  let query = supabase
    .from('inventory')
    .select('*', { count: 'exact' })
    .order(sortBy.field, { ascending: sortBy.direction });

  // if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  const { error, data, count } = await query;

  if (error || !data) {
    console.error(error);

    throw new Error('کاڵاکان نەدۆزرانەوە');
  }

  return { data, count };
}
export async function addAndEditPhone(newPhone) {
  // create / edit : cabin
  let query = supabase.from('inventory');

  // A : create cabin
  // if (id) console.log(id);
  query = query.insert([newPhone]);

  // B : edit cabin
  // if (id) query = query.update(newPhone).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);

    throw new Error('مۆبایلەکە زیاد نەکرا');
  }

  return data;
}

export async function deleteInventoryItem(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from('inventory')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Inventory item could not be deleted');
  }
  return data;
}

export async function editInventoryItem({ newPhone, id }) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('inventory');
  // console.log(newPhone, id);

  query = query.update([newPhone]).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Inventory item could not be edited');
  }
  return data;
}
export async function UpdateArrayOfItms(arrayToUpdate) {
  let { data, error } = await supabase.rpc('update_array_of_items', {
    p_items: arrayToUpdate,
  });
  if (error) {
    console.error(error);
    throw new Error('Inventory item could not be edited');
  }
  return data;
}