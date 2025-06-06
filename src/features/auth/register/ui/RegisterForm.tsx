'use client';

import { registerValidation } from '../model/validation';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/shared/ui/shadcn';
import { VerifyButton } from './VerifyButton';

// 회원가입 폼
export const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { register, handleSubmit, mail, watch, errors, isLoading, isVerified } = useRegisterForm();

  // 인증 모달 토글
  const handleVerify = () => {
    setIsOpen(true);
  };

  return (
    <Card className="border-[1px] border-dotted w-[320px] md:w-[400px] py-3">
      <CardHeader>
        <CardTitle className="text-2xl text-center">회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                {...register('mail', {
                  required: registerValidation.mail.required,
                  pattern: registerValidation.mail.pattern,
                })}
              />
              {/** 이메일 인증 코드 발송 버튼 */}
              <VerifyButton
                disabled={isVerified === !!mail}
                mail={mail}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onOpenModal={handleVerify}
              />
            </div>
            <div className="grid gap-1">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register('password', {
                    required: registerValidation.password.required,
                    minLength: registerValidation.password.minLength,
                  })}
                />
                <span className="text-xs px-2 text-red-500 h-3">{errors?.password?.message || ' '}</span>
              </div>
              <div className="grid gap-2 mt-1">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register('confirmPassword', {
                    // 비밀번호 확인
                    validate: (confirmPwd) => confirmPwd === watch('password') || '비밀번호를 확인해주세요.',
                  })}
                />
                <span className="text-xs px-2 text-red-500 h-3">{errors?.confirmPassword?.message || ' '}</span>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              회원가입
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
