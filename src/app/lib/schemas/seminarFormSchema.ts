import { z } from 'zod';
import { departmentValues } from '@/app/lib/constants/apply/selectValues';

const REGEX = {
  studentId: /^\d{8}$/,
  phoneNumber: /^010-\d{4}-\d{4}$/,
  preferredDate: /^\d{4}-\d{2}-\d{2}$/,
};

const ERROR_MSG = {
  required: '필수 입력 항목입니다.',
  studentId: '올바른 학번을 입력해주세요.',
  phoneNumber: '올바른 전화번호를 입력해주세요.',
  preferredDate: '올바른 날짜 형식(YYYY-MM-DD)을 입력해주세요.',
};

export const seminarFormSchema = z.object({
  name: z.string().min(1, ERROR_MSG.required),
  department: z.enum(departmentValues),
  grade: z.enum(['1', '2', '3', '4']),
  studentId: z
    .string()
    .min(1, ERROR_MSG.required)
    .regex(REGEX.studentId, ERROR_MSG.studentId),
  phoneNumber: z
    .string()
    .min(1, ERROR_MSG.required)
    .regex(REGEX.phoneNumber, ERROR_MSG.phoneNumber),
  preferredDate: z.string().regex(REGEX.preferredDate, ERROR_MSG.preferredDate),
  presentationTopic: z.string().min(1, ERROR_MSG.required),
  seminarName: z.string().min(1, ERROR_MSG.required),
  estimatedDuration: z.string().min(1, ERROR_MSG.required),
});

export type SeminarFormValues = z.infer<typeof seminarFormSchema>;

export const validateSeminarForm = (formData: FormData) => {
  const formValues = Object.fromEntries(formData.entries());

  return seminarFormSchema.safeParse(formValues);
};
