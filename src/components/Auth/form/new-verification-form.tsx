'use client';

import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';

import { newVerification } from '@/actions/auth/new-verification';
import CardWrapper from '@/components/Auth/card/card-wrapper';
import FormError from '@/components/common/form/form-error';
import FormSuccess from '@/components/common/form/form-success';

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isSuccess, setIsSuccces] = useState(false);

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('トークンが存在しません！');
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  useEffect(() => {
    if (success) {
      setIsSuccces(true);
      alert('認証に成功しました！ログインページに移動してください。');
    }
  }, [success]);

  return (
    <CardWrapper
      hederLabel="メールアドレス認証"
      backButtonLabel="ログインページに進む"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <PropagateLoader />}
        <FormSuccess message={success} />
        {!success && !isSuccess && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
