import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/shared/hooks/useToast';
import { ErrorAuth } from '../model/type';
import { loginWithNextAuth } from '../service';
import { setErrorType } from '../helper/auth';

// 로그인 훅
export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorAuth | null>(null);
  const toast = useToast();

  const { mutate: login } = useMutation({
    mutationFn: loginWithNextAuth,
    // 로그인 진행 동안 로직
    onMutate: () => {
      setIsLoading(true);
    },
    // 로그인 성공 시 로직
    onSuccess: (res) => {
      // 로그인 실패 시
      if (res && !res.ok) {
        const errorObj = setErrorType(res.error);
        // 에러 객체 상태 업데이트
        setError(errorObj);
        toast.error(errorObj.message);
        return;
      }
      // 로그인 성공시
      toast.success('로그인 성공');
      router.push('/');
    },
    // 네크워트 통신 실패 시 로직
    onError: (error) => {
      console.log(`Network Error: ${error}`);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return { login, isLoading, error };
};
