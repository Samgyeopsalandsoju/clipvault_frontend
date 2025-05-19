import { useForm } from 'react-hook-form';
import { useRegister } from './useRegister';
import { useToast } from '@/shared/core/hooks/useToast';
import { RegisterFormData } from '../model/type';
import { useEffect } from 'react';
import { useRegisterStore, useVerifyCodeStore } from '../model/store';

// 회원가입 폼 훅
export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({ mode: 'onChange' });
  const { registerUser, isLoading } = useRegister();
  // 인증 여부 확인
  const isVerified = useVerifyCodeStore((state) => state.isVerified);
  const setIsVerified = useVerifyCodeStore((state) => state.setIsVerified);
  const verifiedMail = useRegisterStore((state) => state.verifiedMail);
  const toast = useToast();

  // 이메일 실시간 값
  const mail = watch('mail');

  // 회원가입 submit 함수
  const onSubmit = (data: RegisterFormData) => {
    // 인증 여부 체크
    if (!isVerified || !verifiedMail) {
      toast.error('이메일 인증을 진행해주세요.');
      return;
    }

    // 회원가입 함수 호출
    registerUser({ ...data, verifiedMail });
  };

  // 이메일 변경됨을 감지하면 인증 초기화
  useEffect(() => {
    setIsVerified(false);
  }, [mail]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    mail,
    watch,
    errors,
    isLoading,
    isVerified,
  };
};
