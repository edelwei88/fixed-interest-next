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
  firstname: z.string(),
  lastname: z.string(),
  phonenumber: z.string().length(10).regex(new RegExp('^[0-9]*$')),
  login: z.string(),
  password: z.string(),
});

export default function Page() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      login === '' ||
      password === '' ||
      firstname === '' ||
      lastname === '' ||
      phonenumber === ''
    )
      return;
    fetch('http://localhost:3001/auth/register', {
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
  }, [login, password, firstname, lastname, phonenumber]);

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setPhonenumber(data.phonenumber);
    setLogin(data.login);
    setPassword(data.password);
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
