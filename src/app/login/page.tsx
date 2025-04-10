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
import { useEffect, useState } from 'react';
import { SetCookie } from '../action';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export default function Page() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (login === '' || password === '') return;
    fetch('http://localhost:3001/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        Login: login,
        Password: password,
      }),
    })
      .then(res => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(data => {
        SetCookie(data.Token.Token);
        router.push('lk');
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, [login, password]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLogin(data.login);
    setPassword(data.password);
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
