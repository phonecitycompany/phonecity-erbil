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
  if (sortBy && !sortBy.isName) {
    query = query.order(sortBy.field, { ascending: sortBy.direction });
  } else {
    const nameCol =
      filter?.tableName === 'companies'
        ? 'company_name'
        : filter?.tableName === 'sellers'
          ? 'seller_name'
          : 'debtor_name';
    if (!dateBetween.startDate || !dateBetween.endDate) {
      query = query.order(nameCol, {
        ascending: !(sortBy?.isName && sortBy.direction === false),
      });
    }
  }

  const { error, data, count } = await query;
  if (error || !data) {
    console.error(error);

    throw new Error('کاڵاکان نەدۆزرانەوە');
  }

  const getName = item =>
    (
      item?.company_name ||
      item?.seller_name ||
      item?.debtor_name ||
      item?.sname ||
      item?.cname ||
      item?.dname ||
      item?.name ||
      ''
    ).trim();

  if (data?.length) {
    if (sortBy && !sortBy.isName) {
      // User explicitly sorted by total
    } else {
      const isDesc = sortBy?.isName && sortBy.direction === false;
      data.sort((a, b) => {
        const comp = getName(a).localeCompare(
          getName(b),
          ['ckb', 'ku', 'ar', 'en'],
          { sensitivity: 'base', numeric: true },
        );
        return isDesc ? -comp : comp;
      });
    }
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
