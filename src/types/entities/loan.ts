import { LoanPayment } from '@/types/entities/loan-payment';
import { LoanType } from './loan-type';

export interface Loan {
  ID: Number;
  InitialValue: Number;
  Time: string;
  Term: Number;
  Payday: Number;
  LoanTypeID: Number;
  LoanType: LoanType;
  UserID: Number;
  LoanPayments: LoanPayment[];
}
