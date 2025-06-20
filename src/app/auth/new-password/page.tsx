import React from 'react';

import NewPasswordForm from '@/components/Auth/form/new-password-form';

export const runtime = 'edge';

const NewPasswordPage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <NewPasswordForm />
    </main>
  );
};

export default NewPasswordPage;
