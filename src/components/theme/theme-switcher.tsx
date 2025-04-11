'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
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
  );
}
