'use server';

import { SetBearerToken } from '@/cookies/bearer-token/action';
import { redirect } from 'next/navigation';

export async function Login(login: string, password: string) {
  const res = await fetch('http://localhost:3001/auth/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({
      Login: login,
      Password: password,
    }),
  });

  if (!res.ok) return null;
  const json = await res.json();
  await SetBearerToken(json.Token.Token);

  redirect('/client/loans');
}
