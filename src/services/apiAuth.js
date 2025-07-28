import supabase from './supabase';

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
export async function updateCurrentUser({ email, password , first_name , last_name  }) {
  const { data, error } = password ?  await supabase.auth.updateUser({
    password,
  }): await supabase.auth.updateUser({
    email,
      data: {
        first_name: first_name,
        last_name: last_name,
      }
  } );
  if (error) throw new Error(error.message);

  return data;
}
export async function createNewUser({ email, password , first_name , last_name  , accountType}) {
  
  try {
    // Sign up the user without automatically signing in
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: first_name,
          last_name: last_name,
          account_type: accountType,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // Manually sign in the user if needed
    // supabase.auth.signIn({ email, password });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }

}