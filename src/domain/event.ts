import { InferType, array, object, string } from 'yup';

export const eventFormSchema = object({
  eventId: string().required(), // TODO: 必須化
  eventName: string().required(),
  members: array().of(string().required()).min(1).required(),
  meetingPlace: string(),
  startDate: string(),
  startTime: string(),
  dissolutionPlace: string(),
  endDate: string(),
  endTime: string(),
  message: string(),
});

export type EventData = InferType<typeof eventFormSchema>;
