'use server'

import { cookies } from 'next/headers'

export async function setAuthCookies(
  access_token: string,
  refreshtoken: string,
  is_signup_finished?: boolean,
  plan?: string
) {
  const cookieStore = await cookies()
  
  cookieStore.set('authToken', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
  
  cookieStore.set('refreshToken', refreshtoken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  })

  if (is_signup_finished !== undefined) {
    cookieStore.set('is_signup_finished', String(is_signup_finished), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  if (plan) {
    cookieStore.set('plan', plan, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete('authToken')
  cookieStore.delete('refreshToken')
  cookieStore.delete('is_signup_finished')
  cookieStore.delete('plan')
}

