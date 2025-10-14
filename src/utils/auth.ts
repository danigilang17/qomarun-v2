// src/utils/auth.ts

import { createClient } from '../../supabase/server'
import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js'

/**
 * Mengambil data pengguna yang sedang login di Server Component.
 * @returns {Promise<User | null>} Objek pengguna jika login, atau null jika tidak.
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createClient() // Added await here

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

/**
 * Melindungi sebuah halaman agar hanya bisa diakses oleh pengguna yang sudah login.
 * Jika tidak ada pengguna yang login, akan dialihkan ke halaman /sign-in.
 * @returns {Promise<User>} Objek pengguna jika login.
 */
export async function protectPage(): Promise<User> {
  const supabase = await createClient() // And also here

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }

  return user
}