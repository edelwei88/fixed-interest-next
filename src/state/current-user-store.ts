import { create } from 'zustand';
import { CurrentUserStore } from '@/types/state/current-user-store';

export const useCurrentUserStore = create<CurrentUserStore>(set => ({
  User: null,
  SetUser: user => {
    set(() => ({
      User: user,
    }));
  },
}));
