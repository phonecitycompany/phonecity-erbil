import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';

import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const { login, isLoading } = useLogin();

  async function onFormSubmit(data) {
    if (!data.email || !data.password) {
      return;
    }

    const loginObj = { email: data.email, password: data.password };

    login(loginObj);
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormRowVertical label="ئیمەیڵ" error={errors?.email?.message}>
        <input
          className="input w-96"
          disabled={isLoading}
          type="text"
          id="email"
          // defaultValue={'mohammadsalih.main@gmail.com'}
          autoComplete="username"
          {...register('email', {
            required: 'ئیمەیڵ داغڵ بکە',
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="وشەی نهێنی" error={errors?.password?.message}>
        <input
          className="input"
          disabled={isLoading}
          type="password"
          id="password"
          // defaultValue={'m0TH7Itw..'}
          autoComplete="current-password"
          {...register('password', {
            required: 'وشەی نهێنی داغڵ بکە',
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button
          className="mx-auto mt-6"
          type="submit"
          variation="confirm"
          size="large"
        >
          {!isLoading ? 'چونەژورەوە' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
