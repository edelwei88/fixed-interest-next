'use server';

import { cookies } from 'next/headers';

export async function SetBearerToken(BearerToken: string) {
  const cookie = await cookies();
  cookie.set('Bearer', BearerToken);
}

export async function GetBearerToken() {
  const cookie = await cookies();
  return cookie.get('Bearer')?.value;
}
export async function DeleteBearerToken() {
  const cookie = await cookies();
  cookie.delete('Bearer');
}
