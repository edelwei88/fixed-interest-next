'use client';

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
import { useState } from 'react';
import { Login } from './action';

const FormSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export default function Page() {
  const [error, setError] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if ((await Login(data.login, data.password)) === null) setError(true);
  }

  return (
    <Form {...form}>
      {error === true && (
        <div className='mb-10'>
          <span className='text-red-800'>Неверный логин или пароль</span>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Войти</Button>
      </form>
    </Form>
  );
}
