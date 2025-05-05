import { InferType, array, number, object, string } from 'yup';

export const expenseAddFormSchema = object({
  expenseName: string().required(),
  price: number().required(),
  payerName: string().required(),
  members: array().of(string().required()).min(1).required(),
});
export const expenseEditFormSchema = object({
  expenseId: number().required(),
  expenseName: string().required(),
  price: number().required(),
  payerName: string().required(),
  members: array().of(string().required()).min(1).required(),
});

export type ExpenseDataWithoutId = InferType<typeof expenseAddFormSchema>;

export type ExpenseData = InferType<typeof expenseEditFormSchema>;
