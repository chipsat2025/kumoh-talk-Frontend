'use client';

import { FormProvider } from 'react-hook-form';

import styles from './inputForm.module.scss';
import { useFormAction } from '@/app/lib/hooks/apply/useFormAction';
import { useFormState } from 'react-dom';
import InputFields from './InputFields';
import submitAction from '@/app/lib/apis/info-form/submitAction';
import { InfoFormValues } from '@/app/lib/schemas/infoFormSchema';
import { useRouter } from 'next/navigation';
import { submitMyAdditionalInfo } from '@/app/lib/apis/user';

export default function InputForm({ redirect }: { redirect?: string }) {
  const [formState, formAction] = useFormState(submitAction, null);

  const router = useRouter();

  const form = useFormAction<InfoFormValues>({
    formState,
    defaultValues: {
      studentStatus: '재학',
      grade: '1',
      department: '전자공학부',
      studentId: '',
      phoneNumber: '',
      email: '',
    },
    onSuccess: async () => {
      console.log('onSuccess');
      try {
        const redirectUrl = (redirect?.startsWith('/') && redirect) || '/';

        const res = await submitMyAdditionalInfo(form.getValues());
        if (res.status === 200) {
          window.location.href = redirectUrl;
          return;
        }

        const body = await res.json();
        if (!body) {
          throw new Error('알 수 없는 오류가 발생했습니다.');
        }

        if (body.code == 'SECURITY_0004') {
          alert('토큰이 만료되었습니다. 재로그인해주세요.');
          window.location.href = '/';
        } else if (body.code == 'USER_0003') {
          alert('이미 추가 정보를 입력하여 등록할 수 없습니다.');
          window.location.href = redirectUrl;
        } else {
          alert(
            `추가 정보를 제출하는 중 오류가 발생했습니다. (오류 코드: ${body.code})`,
          );
        }
      } catch (e) {
        console.error(e);
        alert('추가 정보 입력에 실패했습니다.');
      }
    },
  });

  return (
    <>
      <FormProvider {...form}>
        <form className={styles.container} action={formAction}>
          <InputFields />
        </form>
      </FormProvider>
    </>
  );
}
