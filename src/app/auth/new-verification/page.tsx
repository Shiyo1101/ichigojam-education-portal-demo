import React from 'react';

import NewVerificationForm from '@/components/Auth/form/new-verification-form';

export const runtime = 'edge';

const NewVerificationPage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <NewVerificationForm />
    </main>
  );
};

export default NewVerificationPage;
