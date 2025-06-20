import React from 'react';

import LoginForm from '@/components/Auth/form/login-form';

export const runtime = 'edge';

const LoginPage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
