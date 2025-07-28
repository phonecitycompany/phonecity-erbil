import supabase from './supabase';

export async function getPartners( ) {
  let query = supabase
    .from('partners')
    .select('*', { count: 'exact' })
    
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

export async function AddPartners(newPartner) {
  // create / edit : cabin
  let query = supabase.from('partners');

  // A : create cabin
  // if (id) console.log(id);
  query = query.insert([newPartner]);

  // B : edit cabin
  // if (id) query = query.update(newPartner).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);

    throw new Error('کڕیارەکە زیاد نەکرا');
  }

  return data;
}

export async function EditPartner({ newPartner, id }) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('partners');

  query = query.update([newPartner]).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Seller could not be edited');
  }
  return data;
}
export async function DeletePartner( id ) {
  const { data, error } = await supabase
  .from('partners')
  .delete()
  .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Partners could not be deleted');
  }
  return data;
}