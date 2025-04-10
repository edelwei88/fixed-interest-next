import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock, Mail, Map, Phone } from 'lucide-react';

export default function Page() {
  return (
    <>
      <div className='mx-auto flex flex-col mb-5'>
        <span className='mb-2 text-2xl'>Наши контакты</span>
        <div className='flex flex-col border-2 rounded-2xl p-5 gap-2'>
          <div className='flex gap-2 items-center'>
            <Phone />
            <span>+7 (123) 456-78-90</span>
          </div>
          <div className='flex gap-2 items-center'>
            <Mail />
            <span>support@pitfall.com</span>
          </div>
          <div className='flex gap-2 items-center'>
            <Map />
            <span>г. Москва, ул. Примерная, д. 1</span>
          </div>
          <div className='flex gap-2 items-center'>
            <Clock />
            <span>Пн-ПТ: 9:00 - 18:00</span>
          </div>
        </div>
      </div>
      <div className='mx-auto flex flex-col'>
        <span className='mb-2 text-2xl'>Часто задаваемые вопросы</span>
        <div className='border-2 rounded-2xl p-5'>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>
                Как я могу подать заявку на кредит?
              </AccordionTrigger>
              <AccordionContent>
                Вы можете подать заявку на кредит онлайн через наш веб-сайт или
                посетить одно из наших отделений. Для подачи заявки вам
                потребуется предоставить личные данные и информацию о доходах.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>
                Какие документы необходимы для получения кредита?
              </AccordionTrigger>
              <AccordionContent>
                Для получения кредита вам понадобятся паспорт, ИНН, справка о
                доходах и, возможно, дополнительные документы в зависимости от
                типа кредита.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>
                Как долго рассматривается заявка на кредит?
              </AccordionTrigger>
              <AccordionContent>
                Время рассмотрения заявки на кредит зависит от типа кредита и
                предоставления документов. Обычно она занимает от 1 до 5 рабочих
                дней.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-4'>
              <AccordionTrigger>
                Могу ли я погасить кредит досрочно?
              </AccordionTrigger>
              <AccordionContent>
                Да, вы можете погасить кредит досрочно без дополнительных
                комиссий. Пожалуйста, свяжитесь с нашим отделом обслуживания
                клиентов для получения подробной информации.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-5'>
              <AccordionTrigger>
                Какие виды кредитов вы предлагаете?
              </AccordionTrigger>
              <AccordionContent>
                Мы предлагаем различные виды кредитов, включая потребительские
                кредиты, ипотечные кредиты.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-6'>
              <AccordionTrigger>
                Какие виды кредитов вы предлагаете?
              </AccordionTrigger>
              <AccordionContent>
                Мы предлагаем различные виды кредитов, включая потребительские
                кредиты, ипотечные кредиты.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
