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

export async function getAuthCookies(){
  const cookieStore = await cookies()
  
  var authToken = cookieStore.get('authToken');
  
  var refreshToken = cookieStore.get('refreshToken')

  
  var is_signup_finished = cookieStore.get('is_signup_finished')

  var plan = cookieStore.get('plan')

  return {
    authToken,
    refreshToken,
    is_signup_finished,
    plan
  };
}

export async function setRefreshToken(
  refreshtoken: string,
  access_token: string,
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
}

export async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete('authToken')
  cookieStore.delete('refreshToken')
  cookieStore.delete('is_signup_finished')
  cookieStore.delete('plan')
}

