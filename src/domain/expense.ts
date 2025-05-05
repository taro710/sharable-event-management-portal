import { InferType, array, number, object, string } from 'yup';

export const expenseFormSchema = object({
  expenseId: number().required(),
  expenseName: string().required(),
  price: number().required(),
  payerName: string().required(),
  members: array().of(string().required()).min(1).required(),
});

export type ExpenseData = InferType<typeof expenseFormSchema>;
