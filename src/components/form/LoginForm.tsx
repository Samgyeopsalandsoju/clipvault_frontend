import { SOCIAL_LOGIN_OPTIONS } from '@/constants';
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import classNames from 'classnames';
import { RememberMe } from '@/components';

const loginValidationRules = {
  email: {
    required: 'Email is required.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format.',
    },
  },
};

export const LoginForm = () => {
  const { handleClick, handleSubmit, onSubmit, register, trigger } = useLoginForm();
  return (
    <>
      <div className="flex flex-col gap-[5px]">
        <h2 className="text-2xl font-semibold text-center mb-4 dark:text-text-primary-dark">Login</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex flex-col gap-[10px]">
              <input
                className={classNames(
                  'dark:text-text-primary-dark border-[1px] border-solid dark:border-border-focus-dark rounded-[5px]',
                  'dark:bg-background-secondary-dark w-full h-[40px] px-3 autofill-fix'
                )}
                placeholder="Email"
                {...register('mail', {
                  pattern: loginValidationRules.email.pattern,
                })}
                onBlur={() => trigger('mail')}
              />
              <input
                className={classNames(
                  'dark:text-text-primary-dark border-[1px] border-solid dark:border-border-focus-dark rounded-[5px]',
                  'dark:bg-background-secondary-dark w-full h-[40px] px-3 autofill-fix'
                )}
                placeholder="Password"
                type="password"
                {...register('password')}
              />
            </div>
            <RememberMe />
          </div>
          <button
            className={classNames(
              'flex justify-center border-[1px] border-solid dark:border-border-focus-dark text-[15px] ',
              'rounded-[5px] dark:text-text-primary-dark px-2 py-2 active:scale-[0.97]'
            )}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-3 mt-[10px]">
        <Divider text="or" />
        <button
          className={classNames(
            'flex justify-center border-[1px] border-solid dark:border-border-focus-dark text-[15px] ',
            'rounded-[5px] dark:text-text-primary-dark px-2 py-2 active:scale-[0.97]'
          )}
          onClick={handleClick}
        >
          <img className="pr-6 h-[20px]" src={SOCIAL_LOGIN_OPTIONS.EMAIL.logo} />
          {SOCIAL_LOGIN_OPTIONS.EMAIL.text}
        </button>
        <button
          className={classNames(
            'flex justify-center border-[1px] border-solid dark:border-border-focus-dark text-[15px] ',
            'rounded-[5px] dark:text-text-primary-dark px-2 py-2 active:scale-[0.97]'
          )}
        >
          <img className="pr-6 h-[20px]" src={SOCIAL_LOGIN_OPTIONS.GOOGLE.logo} />
          {SOCIAL_LOGIN_OPTIONS.GOOGLE.text}
        </button>
        <button
          className={classNames(
            'flex justify-center border-[1px] border-solid dark:border-border-focus-dark text-[15px] ',
            'rounded-[5px] text-[#000] px-2 py-2 active:scale-[0.97] bg-[#FAE300]'
          )}
        >
          <img className="pr-6 h-[20px]" src={SOCIAL_LOGIN_OPTIONS.KAKAO.logo} />
          {SOCIAL_LOGIN_OPTIONS.KAKAO.text}
        </button>
      </div>
    </>
  );
};

const Divider = ({ text }: { text?: string }) => {
  return (
    <div className="flex items-center text-center text-gray-500 my-4">
      <span className="flex-1 border-b border-gray-300"></span>
      {text && <span className="mx-4">{text}</span>}
      <span className="flex-1 border-b border-gray-300"></span>
    </div>
  );
};
