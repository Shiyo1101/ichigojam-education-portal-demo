import React from 'react';

import ResetEmailForm from '@/components/Settings/reset-email-form';

export const runtime = 'edge';

const NewVerificationPage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <ResetEmailForm />
    </main>
  );
};

export default NewVerificationPage;
