'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { useLoginForm } from '../hooks/useLoginForm';
import { loginValidation } from '../model/validation';
import { Modal } from '@/shared/ui/Modal';

function LoginForm() {
  const [isOpen, setIsOpen] = useState(true);
  const { register, handleSubmit } = useLoginForm();
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Card className="border-[1px] border-dotted w-[320px] md:w-[400px]">
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
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register('password', {
                    required: loginValidation.password.required,
                  })}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
}

export { LoginForm };
