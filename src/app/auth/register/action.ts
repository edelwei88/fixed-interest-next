'use server';

import { SetBearerToken } from '@/cookies/bearer-token/action';
import { redirect } from 'next/navigation';

export async function Register(
  firstname: string,
  lastname: string,
  phonenumber: string,
  login: string,
  password: string,
) {
  const res = await fetch('http://localhost:3001/auth/register', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({
      FirstName: firstname,
      LastName: lastname,
      PhoneNumber: phonenumber,
      Login: login,
      Password: password,
    }),
  });

  if (!res.ok) return null;

  const json = await res.json();
  SetBearerToken(json.Token.Token);

  redirect('/client/loans');
}
