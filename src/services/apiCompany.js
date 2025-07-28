import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
import { useSearchParams } from 'react-router-dom';

export async function getCompanyItems() {
  let query = supabase
    .from('companies')
    .select('*', { count: 'exact' })
    .order('id', { ascending: true });

  const { error, data, count } = await query;

  if (error || !data) {
    console.error(error);

    throw new Error('کڕیارەکان نەدۆزرانەوە');
  }

  return { data, count };
}

export async function addCompany(newCompany) {
  // create / edit : cabin
  let query = supabase.from('companies');

  // A : create cabin
  // if (id) console.log(id);

  query = query.insert([newCompany]);

  // B : edit cabin
  // if (id) query = query.update(newSeller).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);

    throw new Error('کڕیارەکە زیاد نەکرا');
  }

  return data;
}

export async function editCompanyItem({ newCompany, id }) {
  // REMEMBER RLS POLICIES
  let query = supabase.from('companies');
  // console.log(newCompany , id);
  query = query.update([newCompany]).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('companies could not be edited');
  }
  return data;
}
export async function deleteCompanyItem(id) {
  const { data, error } = await supabase
    .from('companies')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('companies could not be deleted');
  }
  return data;
}
export async function getSingleComany(companyId) {
  if (!companyId) return {};

  const { data, error } = await supabase
    .from('companies')
    .select('total')
    .eq('id', companyId)
    .single();

  if (error) {
    console.error(error);
    throw new Error('company data could not be fetched');
  }
  return data;
}