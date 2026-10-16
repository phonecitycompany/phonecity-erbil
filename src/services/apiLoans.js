import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
import { useSearchParams } from 'react-router-dom';

export async function getLoansItems({ page, loanstab }) {
  let query = supabase
    .from('debtor')
    .select('*', { count: 'exact' })
    .order('debtor_name', { ascending: true });

  const { error, data, count } = await query;

  if (error || !data) {
    console.error(error);

    throw new Error('وەرگرکان نەدۆزرانەوە');
  }

  data.sort((a, b) =>
    (a?.debtor_name || '')
      .trim()
      .localeCompare((b?.debtor_name || '').trim(), ['ckb', 'ku', 'ar', 'en'], {
        sensitivity: 'base',
        numeric: true,
      }),
  );

  return { data, count };
}

export async function AddLoansItem(newLoan) {
  // create / edit : cabin
  let query = supabase.from('debtor');

  // A : create cabin
  // if (id) console.log(id);
  query = query.insert([newLoan]);

  // B : edit cabin
  // if (id) query = query.update(newLoan).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);

    throw new Error('وەرگر زیاد نەکرا');
  }

  return data;
}

export async function editLoansItem({ newLoan, loanId }) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('debtor');

  query = query.update([newLoan]).eq('id', loanId);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('debtor could not be edited');
  }
  return data;
}
export async function deleteLoanitem(id) {
  const { data, error } = await supabase.from('debtor').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('debtor could not be deleted');
  }
  return data;
}