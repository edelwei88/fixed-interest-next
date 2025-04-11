'use server';

import { GetBearerToken } from '@/cookies/bearer-token/action';

export async function AddLoan(
  initialvalue: number,
  term: number,
  payday: number,
  loantypeid: number,
) {
  const res = await fetch('http://localhost:3001/data/add_loan', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + (await GetBearerToken()),
    },
    method: 'post',
    body: JSON.stringify({
      InitialValue: initialvalue,
      Term: term,
      Payday: payday,
      LoanTypeID: loantypeid,
    }),
  });

  if (!res.ok) return null;

  const json = await res.json();

  return json;
}
