import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getUsers({page, filter   }) {
  let query = supabase
    .from(filter?.tableName)
    .select("*", { count: 'exact' })

        if(filter?.type){
          query = query.eq('type', filter?.type);
        }

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