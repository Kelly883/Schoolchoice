import { AuthLayout } from '@/components/layout';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="card card-padded">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2 text-center">Create Account</h1>
          <p className="text-neutral-600 text-center mb-6">Register for a parent or student account</p>
          <RegisterForm />
        </div>
      </div>
    </AuthLayout>
  );
}
