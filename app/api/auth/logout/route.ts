import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  
  // Clear all auth-related cookies
  cookieStore.delete('authToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('is_signup_finished');
  cookieStore.delete('plan');

  return NextResponse.json({ success: true });
}