export type ExpenseTestDataType<T> = {
  PARTICIPANTS: T[];
  DATA: {
    name: string;
    price: number;
    person: T;
    person2: T[];
  }[];
  RESULT1: {
    paidMemberName: T;
    totalPaidFee: number;
  }[];
  RESULT2: {
    participant: T;
    totalFee: number;
  }[];
  RESULT3: {
    participant: T;
    balance: number;
  }[];
  RESULT4: {
    participant: T;
    to: {
      participant: T;
      price: number;
    }[];
  }[];
};
