import { useVerifyCode } from '@/hooks/auth/useVerifyCode';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

const VerifyCodeCheck = ({
  email,
  onVerified,
}: {
  email: string;
  onVerified: (data: { verified: boolean; encryptedEmail: string }) => void;
}) => {
  const CODE_LENGTH = 6;
  const [value, setValue] = useState<string>('');
  const { checkCode, sendEmail } = useVerifyCode();
  const [status, setStatus] = useState<'default' | 'processing' | 'verified'>('default');
  const [authKey, setAuthKey] = useState<string>('');

  const onClickSend = async () => {
    if (!email || email.length === 0) {
      return false;
    }
    setStatus('processing');
    try {
      const { result } = await sendEmail(email);
      if (result) {
        setAuthKey(result);
      } else {
        setStatus('default');
      }
    } catch (error) {
      setStatus('default');
    }
  };

  const normalizeInput = (value: string) => {
    return value.trim().toUpperCase();
  };

  const verifyCode = async () => {
    const normalizedValue = normalizeInput(value);
    if (normalizedValue.length < CODE_LENGTH) {
      return false;
    }

    try {
      const result = await checkCode({ mail: email, authCode: value, authKey: authKey });

      if (result) {
        setStatus('verified');
        onVerified({ verified: true, encryptedEmail: result });
      } else {
        setStatus('default');
      }
    } catch (error) {
      setStatus('default');
    }
  };

  useEffect(() => {
    if (value.length === CODE_LENGTH) {
      verifyCode();
    }
  }, [value]);

  return (
    <div className="flex gap-2">
      <input
        className={classNames(
          'dark:text-text-primary-dark border-[1px] border-solid  rounded-[5px]',
          'dark:bg-background-primary-dark w-full h-[35px] px-3 tracking-widest',
          {
            'border-[#f44336]': status === 'processing' || status === 'default',
            'dark:border-border-focus-dark': status === 'verified',
          }
        )}
        placeholder="Verify code"
        value={value}
        onChange={(e) => {
          const {
            currentTarget: { value },
          } = e;
          if (value.length > 6) {
            return false;
          }
          setValue(value);
        }}
        readOnly={status === 'verified'}
      />
      <button
        className={classNames(
          'flex justify-center items-center border-[1px] border-solid dark:border-border-focus-dark text-[15px]',
          'rounded-[5px] dark:text-text-primary-dark w-[100px] active:scale-[0.97]'
        )}
        type="button"
        onClick={onClickSend}
        disabled={!(status === 'default')}
      >
        {status === 'processing' ? (
          <Loader className="animate-spin dark:text-text-primary-dark" />
        ) : status === 'verified' ? (
          'verified'
        ) : (
          'send'
        )}
      </button>
    </div>
  );
};

export default VerifyCodeCheck;
