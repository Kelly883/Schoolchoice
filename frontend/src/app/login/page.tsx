import { AuthLayout } from '@/components/layout';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="card card-padded">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2 text-center">Welcome Back</h1>
          <p className="text-neutral-600 text-center mb-6">Sign in to your account</p>
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
}
