import { User } from '@/types/entities/user';

export interface CurrentUserStore {
  User: User | null;
  SetUser: (user: User | null) => void;
}
