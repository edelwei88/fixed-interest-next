import { Role } from '@/types/entities/role';
import { Loan } from '@/types/entities/loan';

export interface User {
  ID: Number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Login: string;
  PasswordHash: string;
  RoleID: Number;
  Role: Role;
  Loans: Loan[];
}
