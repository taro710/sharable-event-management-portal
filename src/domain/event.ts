import { InferType, array, object, string } from 'yup';

export const eventFormSchema = object({
  eventName: string().required(),
  members: array()
    .of(string().required('err1'))
    .min(1, 'err2')
    .required('err3'),
  meetingPlace: string(),
  startDate: string(),
  startTime: string(),
  dissolutionPlace: string(),
  endDate: string(),
  endTime: string(),
  message: string(),
});

export type EventData = InferType<typeof eventFormSchema>;
