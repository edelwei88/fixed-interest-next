export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-[1500px] mx-auto mt-30'>
      <div className='bg-white dark:bg-black h-full rounded-2xl mx-5 p-5'>
        {children}
      </div>
    </div>
  );
}
