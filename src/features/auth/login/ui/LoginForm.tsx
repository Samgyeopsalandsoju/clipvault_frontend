'use client';

import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label } from '@/shared/ui/shadcn';
import Link from 'next/link';
import { useLoginForm } from '../hooks/useLoginForm';
import { loginValidation } from '../model/validation';
import { useAuthModalStore } from '../model/store';
import { Modal } from '@/shared/ui/modal/Modal';

// 로그인 폼
export const LoginForm = () => {
  const isLoginModalOpen = useAuthModalStore((state) => state.isLoginModalOpen);
  const onLoginModalClose = useAuthModalStore((state) => state.onLoginModalClose);
  const { register, handleSubmit } = useLoginForm();

  return (
    <Modal isOpen={isLoginModalOpen} onClose={() => onLoginModalClose()}>
      <Card className="w-[320px] md:w-[400px] shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)] transition-all duration-300 p-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  tabIndex={1}
                  {...register('mail', {
                    required: loginValidation.mail.required,
                    pattern: loginValidation.mail.pattern,
                  })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    tabIndex={5}
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  tabIndex={2}
                  required
                  {...register('password', {
                    required: loginValidation.password.required,
                  })}
                />
              </div>
              <Button type="submit" tabIndex={3} className="w-full">
                Login
              </Button>
              {/** TODO - 구글 로그인 */}
              {/* <Button variant="outline" tabIndex={4} className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link
                tabIndex={6}
                href="/register"
                className="underline underline-offset-4 ml-3"
                onClick={onLoginModalClose}
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};
