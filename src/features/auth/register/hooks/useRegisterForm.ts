import { useForm } from 'react-hook-form';
import { useRegister } from './useRegister';
import { useToast } from '@/shared/hooks/useToast';
import { RegisterFormData } from '../model/type';
import { useVerifyStore } from '../../verification/model/store';

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({ mode: 'onChange' });
  const { registerUser, isLoading } = useRegister();
  // 인증 여부 확인
  const isVerified = useVerifyStore((state) => state.isVerified);
  const toast = useToast();

  // 이메일 실시간 값
  const mail = watch('mail');

  // 회원가입 submit 함수
  const onSubmit = (data: RegisterFormData) => {
    // 인증 여부 체크
    if (!isVerified) {
      toast.error('이메일 인증을 진행해주세요.');
      return;
    }
    // 회원가입 함수 호출
    registerUser(data);
  };

  return { register, handleSubmit: handleSubmit(onSubmit), mail, watch, errors, isLoading };
};
