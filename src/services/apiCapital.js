import supabase from './supabase';

export async function getAllCapital() {
  let query = supabase.from('capital').select('*');

  const { data, error } = await query;

  if (error || !data) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }

  return data;
}

export async function getcapital() {
  let query = supabase
    .from('capital')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .limit(1)
    .single();

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

export async function addCapital(newPartner) {
  // create / edit : cabin
  let query = supabase.from('capital');

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

export async function editCapital({ newPartner, id }) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('capital');

  query = query.update([newPartner]).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Seller could not be edited');
  }
  return data;
}
export async function getcapitalTransaction({ dateBetween }) {
  let query = supabase
    .from('capital')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false });

  if (dateBetween) {
    query = query.in('date', [dateBetween]);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error('Seller could not be edited');
  }
  return data;
}

export async function getcapitalvalueByDate({
  filterStartDate,
  filterEndDate,
}) {
  let query = supabase.from('capital').select('*', { count: 'exact' });

  if (filterStartDate) {
    query = query.gte('updated_at', filterStartDate).limit(1);
  } else if (filterEndDate) {
    query = query.gte('updated_at', filterEndDate).limit(1);
  } else {
    // If loanId is null or undefined, return an empty array with count 0
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

    throw new Error('کڕیارەکان نەدۆزرانەوە');
  }

  return { data, count };
}
export async function getValueForDashboard({ filterStartDate, filterEndDate }) {
  let query = filterEndDate
    ? supabase.rpc('get_most_recent_row')
    : supabase.rpc('get_data_from_previous_day');

  const { data, error } = await query;
  if (error || !data) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }

  return data;
}
export async function getValueForCapital() {
  let query = supabase.rpc('get_daily_values_for_capital');
  const { data, error } = await query;
  if (error || !data) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
  return data;
}

// CREATE OR REPLACE FUNCTION public.update_capital()
//  RETURNS trigger
//  LANGUAGE plpgsql
// AS $function$
// BEGIN
//   INSERT INTO capital (value)
//   VALUES ((
//     SELECT
//     COALESCE((SELECT sum(total) FROM sellers), 0) +
//     COALESCE((SELECT sum(total) FROM companies), 0) +
//     COALESCE((SELECT sum(total) FROM debtor), 0) +
//     COALESCE((SELECT sum(total_price) FROM inventory), 0) +
//     COALESCE((SELECT sum((SELECT sum(deposit - withdrawal) FROM vault) + (SELECT sum(total) FROM partners))), 0)
//   ));
//   RETURN NEW;
// END;
// $function$
