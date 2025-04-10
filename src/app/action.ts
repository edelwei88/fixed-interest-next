'use server';

import { cookies } from 'next/headers';

export async function SetCookie(BearerToken: string) {
  const cookie = await cookies();
  cookie.set('Bearer', BearerToken);
}

export async function GetCookie() {
  const cookie = await cookies();
  return cookie.get('Bearer')?.value;
}
