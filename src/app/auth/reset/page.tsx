import React from 'react';

import ResetForm from '@/components/Auth/form/reset-form';

export const runtime = 'edge';

const ResetPage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <ResetForm />
    </main>
  );
};

export default ResetPage;
