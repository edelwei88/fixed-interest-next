'use client';

import { LoanType } from '@/types/entities/loan-type';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AddLoan } from './action';
import { useCurrentUserStore } from '@/state/current-user-store';
import {
  DeleteBearerToken,
  GetBearerToken,
  SetBearerToken,
} from '@/cookies/bearer-token/action';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { redirect } from 'next/navigation';

export default function Page() {
  const [error, setError] = useState(false);
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
  const currentUserStore = useCurrentUserStore(state => state);

  useEffect(() => {
    async function flt() {
      const res = await fetch('http://localhost:3001/loan_types');
      const json = await res.json();
      setLoanTypes(json.LoanTypes);
    }
    async function gu() {
      const res = await fetch('http://localhost:3001/data/current_user', {
        headers: {
          Authorization: 'Bearer ' + (await GetBearerToken()),
        },
      });
      const json = await res.json();
      currentUserStore.SetUser(json.User);
    }
    flt();
    gu();
  }, [currentUserStore.User]);

  const FormSchema = z.object({
    initialvalue: z.coerce.number(),
    term: z.coerce.number().int(),
    payday: z.coerce.number().int().max(31),
    loantypeid: z.coerce.number().int(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      initialvalue: 0,
      term: 0,
      payday: new Date().getDate(),
      loantypeid: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (
      (await AddLoan(
        data.initialvalue,
        data.term,
        data.payday,
        data.loantypeid,
      )) === null
    ) {
      setError(true);
      return;
    }
    currentUserStore.SetUser(null);
  }

  if (loanTypes === undefined) return null;
  if (currentUserStore.User === null) {
    return <div>Отказано в доступе</div>;
  }

  return (
    <div className='flex flex-col '>
      <div className='mb-5'>
        <div className='mb-5'>
          <span>Взять кредит</span>
        </div>
        <div>
          <Form {...form}>
            {error === true && (
              <div className='mb-10'>
                <span className='text-red-800'>Неверный логин или пароль</span>
              </div>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='initialvalue'
                render={({ field }) => (
                  <FormItem className='mb-5'>
                    <FormLabel>Сумма</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='term'
                render={({ field }) => (
                  <FormItem className='mb-5'>
                    <FormLabel>Длительность</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='loantypeid'
                render={({ field }) => (
                  <FormItem className='mb-5'>
                    <FormLabel>Вид кредита</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {loanTypes.map(item => (
                          <SelectItem
                            value={item.ID.toString()}
                            key={item.ID.toString()}>
                            {item.Type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Взять кредит</Button>
            </form>
          </Form>
        </div>
      </div>
      <div>
        <div>
          <span>Кредиты</span>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Время</TableHead>
                <TableHead>День оплаты</TableHead>
                <TableHead>Тип кредита</TableHead>
                <TableHead>Выплачено</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUserStore.User &&
                currentUserStore.User.Loans.map(item => (
                  <TableRow key={item.ID.toString()}>
                    <TableCell>{item.ID.toString()}</TableCell>
                    <TableCell>{item.InitialValue.toString()}</TableCell>
                    <TableCell>{item.Time.toString()}</TableCell>
                    <TableCell>{item.Term.toString()}</TableCell>
                    <TableCell>{item.Payday.toString()}</TableCell>
                    <TableCell>{item.LoanType.Type}</TableCell>
                    <TableCell>
                      {item.LoanPayments.reduce(
                        (acc: number, cur) => acc + cur.Amount,
                        0,
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='mt-10'>
        <Button
          onClick={() => {
            DeleteBearerToken();
            redirect('/');
          }}>
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
}
