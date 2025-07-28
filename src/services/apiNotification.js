import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getNotification({ filter , arrayOfThreeDays}) {
  // let query = await supabase.rpc('get_notification', { p_array_of_three_days : arrayOfThreeDays})
  let query =  supabase
    .from(filter?.tableName)
    .select(filter?.select, { count: 'exact' })
    // .order(filter.field, { ascending: filter.direction });
// console.log(arrayOfThreeDays)
    if (arrayOfThreeDays && arrayOfThreeDays?.length > 0) {
        query = query.or(`returning_date.in.(${arrayOfThreeDays})`, `returning_date_reminder.in.(${arrayOfThreeDays})`);
        }
  
        if(filter?.type){
          query = query.eq('sellers.type', filter?.type);
        }
  
          
        const { error, data, count } = await query;
  if (error || !data) {
    console.error(error);

    throw new Error('کاڵاکان نەدۆزرانەوە');
  }

  return { data  , count };
}