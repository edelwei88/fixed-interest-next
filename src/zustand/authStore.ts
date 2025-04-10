import { create } from 'zustand';

export interface UserData {
  ID: Number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Login: string;
  PasswordHash: string;
  RoleID: Number;
  Role: Role;
  Loans?: Loan[];
}

interface Role {
  ID: Number;
  Role: string;
}

interface Loan {
  ID: Number;
  InitialValue: Number;
  Time: string;
  Term: Number;
  Payday: Number;
  LoanTypeID: Number;
  LoanType: LoanType;
  UserID: Number;
  LoanPayments?: LoanPayment[];
}

interface LoanType {
  ID: Number;
  Type: string;
  Interest: Number;
  MinTerm: Number;
  MaxTerm: Number;
  PenaltiesPerDay: Number;
}

interface LoanPayment {
  ID: Number;
  Amount: Number;
  Time: string;
  LoanID: Number;
}

export const useAuthStore = create<UserData | null>(() => null);
