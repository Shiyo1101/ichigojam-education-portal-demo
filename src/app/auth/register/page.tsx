import React from 'react';

import ResisterForm from '@/components/Auth/form/register-form';

export const runtime = 'edge';

const RegisterPage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <ResisterForm />
    </main>
  );
};

export default RegisterPage;
