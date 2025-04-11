import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <nav className='mb-0 mt-10 w-full bottom-2.5 z-10 min-h-40'>
      <div className='h-full max-w-[1500px] mx-auto'>
        <div className='h-full mx-5 rounded-2xl dark:bg-black bg-white flex justify-between items-center px-10'>
          <div className='py-5 flex gap-10 w-full justify-center'>
            <div className='flex flex-col'>
              <Link href='/'>Pitfall</Link>
            </div>
            <div className='flex flex-col'>
              <span className='font-bold'>Системный администратор</span>
              <Separator />
              <Link href='/admin/stats'>Статистика</Link>
            </div>
            <div className='flex flex-col'>
              <span className='font-bold'>Обслуживание клиентов</span>
              <Separator />
              <Link href='/banker/users'>Данные о клиентах</Link>
              <Link href='/banker/stats'>Динамика возврата кредитов</Link>
              <Link href='/banker/verification'>Верификация пользователей</Link>
              <Link href='/banker/loans'>Работа с кредитами</Link>
            </div>
            <div className='flex flex-col'>
              <span className='font-bold'>Клиентская часть</span>
              <Separator />
              <Link href='/client/loans'>Кредиты</Link>
              <Link href='/support'>Поддержка</Link>
              <Link href='/client/docs'>Подтверждение документов</Link>
              <Link href='/support'>Часто задаваемые вопросы</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
