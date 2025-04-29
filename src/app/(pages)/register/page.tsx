import RegisterForm from '@/features/auth/register/ui/RegisterForm';

function RegisterPage() {
  return (
    <main className="flex justify-center items-center h-[calc(100vh-122px)] md:mx-[80px] border-r border-dotted border-l">
      <RegisterForm />
    </main>
  );
}

export default RegisterPage;
