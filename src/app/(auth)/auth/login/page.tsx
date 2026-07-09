import { Suspense } from 'react';
import LoginPageContent from './LoginPageContent';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream pt-20" />}>
      <LoginPageContent />
    </Suspense>
  );
}
