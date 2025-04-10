'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useAuthStore } from '@/zustand/authStore';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GetCookie } from '@/app/action';

const defaultItems = [
  {
    text: 'О нас',
    link: '/about',
  },
  {
    text: 'Войти',
    link: '/login',
  },
  {
    text: 'Зарегистрироваться',
    link: '/register',
  },
  {
    text: 'Поддержка',
    link: '/support',
  },
];

const userItems = [
  {
    text: 'Взять кредит',
    link: '/loan',
  },
  {
    text: 'Личный кабинет',
    link: '/lk',
  },
  {
    text: 'Поддержка',
    link: '/support',
  },
];

export function NavbarMain() {
  const authStore = useAuthStore(state => state);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [cookies, setCookies] = useState(false);

  useEffect(() => {
    GetCookie().then(data => {
      setCookies(data !== undefined);
      setMounted(true);
    });
  }, []);

  if (!mounted) return null;

  return (
    <nav className='fixed w-full top-2.5 z-10 h-20'>
      <div className='h-full max-w-[1500px] mx-auto'>
        <div className='h-full mx-5 rounded-2xl dark:bg-black bg-white flex justify-between items-center px-10'>
          <div className='text-2xl flex justify-center gap-5'>
            <Link href='/'>Pitfall</Link>
            <Button
              variant='outline'
              size='icon'
              onClick={() => {
                if (theme === 'dark' || theme === '') {
                  setTheme('light');
                } else {
                  setTheme('dark');
                }
              }}>
              {theme === 'dark' ? <Moon /> : <Sun />}
            </Button>
          </div>
          <div className='flex justify-end items-center'>
            {cookies === false
              ? defaultItems.map(item => (
                  <Button variant='link' asChild key={item.link}>
                    <Link href={item.link}>{item.text}</Link>
                  </Button>
                ))
              : userItems.map(item => (
                  <Button variant='link' asChild key={item.link}>
                    <Link href={item.link}>{item.text}</Link>
                  </Button>
                ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
