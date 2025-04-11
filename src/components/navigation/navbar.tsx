import Link from 'next/link';
import { Button } from '../ui/button';
import { GetBearerToken } from '@/cookies/bearer-token/action';
import { ThemeSwitcher } from '../theme/theme-switcher';

const defaultItems = [
  {
    text: 'Войти',
    link: '/auth/login',
  },
  {
    text: 'Зарегистрироваться',
    link: '/auth/register',
  },
  {
    text: 'Поддержка',
    link: '/support',
  },
];

const userItems = [
  {
    text: 'Кредиты',
    link: '/client/loans',
  },
  {
    text: 'Документы',
    link: '/client/docs',
  },
  {
    text: 'Поддержка',
    link: '/support',
  },
];

export async function Navbar() {
  const cookies = await GetBearerToken();

  return (
    <nav className='fixed w-full top-2.5 z-10 h-20'>
      <div className='h-full max-w-[1500px] mx-auto'>
        <div className='h-full mx-5 rounded-2xl dark:bg-black bg-white flex justify-between items-center px-10'>
          <div className='text-2xl flex justify-center gap-5'>
            <Link href='/'>Pitfall</Link>
            <ThemeSwitcher />
          </div>
          <div className='flex justify-end items-center'>
            {cookies === undefined
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
