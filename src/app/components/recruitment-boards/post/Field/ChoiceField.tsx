import { Control } from 'react-hook-form';
import FormField from '../../../apply/Form/FormField';
import FormLabel from '../../../apply/Form/FormLabel';
import FormItem from '../../../apply/Form/FormItem';
import FormMessage from '../../../apply/Form/FormMessage';
import Choice from '../Choice/Choice';

type Props = {
  control: Control;
  name: string;
  values: { answerId: number; number: number; answer: string }[];
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function ChoiceField({
  control,
  name,
  values,
  label,
  required = false,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>
              {label}{' '}
              {required && (
                <span aria-label='required' style={{ color: '#ff7f00' }}>
                  *
                </span>
              )}
            </FormLabel>
            {values.map((value) => (
              <Choice
                key={value.answerId}
                {...field}
                onChange={(e) => {
                  field.onChange([
                    {
                      number: value.number,
                    },
                  ]);
                }}
              >
                {value.answer}
              </Choice>
            ))}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
