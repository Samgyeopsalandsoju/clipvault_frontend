'use client';

import { useRegisterForm } from '@/hooks/auth/useRegisterForm';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useWatch } from 'react-hook-form';
import { VerifyCodeCheck } from '../ui/VerifyCodeCheck';

export const RegisterForm = () => {
  const { errors, handleSubmit, control, register, trigger, validator, onSubmit, setValue } = useRegisterForm();
  const [isVerified, setIsVerified] = useState(false);
  const [mail, setMail] = useState('');
  const email = useWatch({ control, name: 'mail' });
  const debouncedEmail = useDebounce(email, 300);

  useEffect(() => {
    setMail(debouncedEmail);
  }, [debouncedEmail]);

  const handleVerification = (data: { verified: boolean; encryptedEmail: string }) => {
    setIsVerified(data.verified);
    setValue('verifiedMail', data.encryptedEmail);
    setValue('verifyCode', 'verified');
  };

  return (
    <div className="flex flex-col gap-[5px] h-[350px]">
      <h2 className="text-2xl font-semibold text-center mb-3 dark:text-text-primary-dark">Sign up</h2>
      <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div>
            <input
              className={classNames(
                'dark:text-text-primary-dark border-[1px] border-solid dark:border-border-focus-dark rounded-[5px]',
                'dark:bg-background-primary-dark w-full h-[35px] px-3 autofill-fix'
              )}
              placeholder="Email"
              {...register('mail', validator.mail)}
              onBlur={() => trigger('mail')}
            />
            <span className="text-xs text-[#f44336] px-3 pb-1 min-h-[20px] block">{errors.mail?.message || ' '}</span>
          </div>
          <div>
            <VerifyCodeCheck email={mail} onVerified={handleVerification} />
            <input type="hidden" {...register('verifyCode', { required: 'Email verification is required.' })} />
            <span className="text-xs text-[#f44336] px-3 pb-1 min-h-[20px] block">
              {errors.verifyCode?.message || ' '}
            </span>
          </div>
          <div>
            <input
              className={classNames(
                'dark:text-text-primary-dark border-[1px] border-solid dark:border-border-focus-dark rounded-[5px]',
                'dark:bg-background-primary-dark w-full h-[35px] px-3'
              )}
              placeholder="Password"
              type="password"
              {...register('password', validator.password)}
            />
            <span className="text-xs text-[#f44336] px-3 py-1 min-h-[20px] block">
              {errors.password?.message || ' '}
            </span>
          </div>
          <div>
            <input
              className={classNames(
                'dark:text-text-primary-dark border-[1px] border-solid dark:border-border-focus-dark rounded-[5px]',
                'dark:bg-background-primary-dark w-full h-[35px] px-3'
              )}
              placeholder="Confirm Password"
              type="password"
              {...register('confirmPassword', validator.confirmPassword)}
            />
            <span className="text-xs text-[#f44336] px-3 py-1 min-h-[20px] block">
              {errors.confirmPassword?.message || ' '}
            </span>
          </div>
        </div>
        <button
          className={classNames(
            'border-[1px] border-solid dark:border-border-focus-dark text-[15px] ',
            'rounded-[5px] dark:text-text-primary-dark px-2 py-2 active:scale-[0.97]'
          )}
          type="submit"
          disabled={!isVerified}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};
