import { AuthLayout } from '@/components/layout';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="card card-padded">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2 text-center">Reset Password</h1>
          <p className="text-neutral-600 text-center mb-6">Enter your email to receive a reset link</p>
          <ResetPasswordForm />
        </div>
      </div>
    </AuthLayout>
  );
}
