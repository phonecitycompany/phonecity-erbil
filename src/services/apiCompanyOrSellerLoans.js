import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
import { id } from 'date-fns/locale';

export async function getLoans({ page, filter, sortBy, dateBetween }) {
  // console.log(dateBetween);
  let query =
    dateBetween.startDate &&
    dateBetween.endDate &&
    filter?.tableName == 'sellers'
      ? supabase.rpc('calculate_seller_transaction_purchases', {
          date1: dateBetween.startDate,
        })
      : dateBetween.startDate &&
          dateBetween.endDate &&
          filter?.tableName == 'companies'
        ? supabase.rpc('calculate_companies_net_purchase', {
            date1: dateBetween.startDate,
          })
        : dateBetween.startDate &&
            dateBetween.endDate &&
            filter?.tableName == 'debtor'
          ? supabase.rpc('calculate_debt_net_purchase', {
              date1: dateBetween.startDate,
            })
          : supabase
              .from(filter?.tableName)
              .select(filter?.select, { count: 'exact' });
  if (filter?.type && !dateBetween.startDate && !dateBetween.endDate) {
    query = query.eq('type', filter?.type);
  }
  if (filter?.type && dateBetween.startDate && dateBetween.endDate) {
    query = query.eq('stype', filter?.type);
  }
  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction });
  }

  // if (page) {
  //   const from = (page - 1) * PAGE_SIZE;
  //   const to = from + PAGE_SIZE - 1;
  //   query.range(from, to);
  // }

  const { error, data, count } = await query;
  if (error || !data) {
    console.error(error);

    throw new Error('کاڵاکان نەدۆزرانەوە');
  }

  if (data.length && page) {
    return {
      data: data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
      count: data.length,
    };
  } else {
    return { data, count };
  }
}
export async function getAllLoans({ filter }) {
  let query = supabase.rpc('calculate_total', {
    table_name: filter?.tableName,
    column_name: 'total',
    filter_column: 'type',
    filter_value: filter?.type || null,
  });

  const { error, data, count } = await query;
  if (error || !data) {
    console.error(error);

    throw new Error('کاڵاکان نەدۆزرانەوە');
  }

  return { data, count };
}
