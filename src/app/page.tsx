import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex'>
      <div className='w-[50%]'>
        <Image src='/bank.png' alt='Image of bank' width={500} height={500} />
      </div>
      <div className='flex justify-center flex-col'>
        <div className='text-3xl mb-3'>
          <span>Инновация в сфере кредитования</span>
        </div>
        <div className='mb-6'>
          <span>
            Lorem ipsum dolor sit amet consectetur adipiscing elit quisque
            faucibus ex sapien vitae pellentesque sem.
          </span>
        </div>
        <div>
          <Button asChild>
            <Link href='/support'>Узнать больше</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
