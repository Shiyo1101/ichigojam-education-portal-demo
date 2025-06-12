import { TriangleAlert } from 'lucide-react';
import React from 'react';

import CardWrapper from '@/components/Auth/card/card-wrapper';

const ErrorCard = () => {
  return (
    <CardWrapper
      hederLabel="Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="back to login"
    >
      <div className="w-full flex justify-center items-center">
        <TriangleAlert className=" text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
