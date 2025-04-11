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
import { Register } from './action';

const FormSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  phonenumber: z.string().length(10).regex(new RegExp('^[0-9]*$')),
  login: z.string(),
  password: z.string(),
});

export default function Page() {
  const [error, setError] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      phonenumber: '',
      login: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (
      (await Register(
        data.firstname,
        data.lastname,
        data.phonenumber,
        data.login,
        data.password,
      )) === null
    )
      setError(true);
  }

  return (
    <Form {...form}>
      {error === true && (
        <div className='mb-10'>
          <span className='text-red-800'>Неверные данные</span>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='firstname'
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastname'
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phonenumber'
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type='submit'>Зарегистрироваться</Button>
      </form>
    </Form>
  );
}
