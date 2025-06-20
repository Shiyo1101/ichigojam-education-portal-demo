'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { PacmanLoader } from 'react-spinners';
import type * as z from 'zod';

import { newPassword } from '@/actions/auth/new-password';
import CardWrapper from '@/components/Auth/card/card-wrapper';
import FormError from '@/components/common/form/form-error';
import FormSuccess from '@/components/common/form/form-success';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NewPasswordSchema } from '@/utils/schema';

const NewPasswordForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      hederLabel="新しいパスワードを入力してください"
      backButtonLabel="ログインページに戻る"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onClick={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          {isPending && <PacmanLoader color="#fdff00" />}
          {!isPending && !success && (
            <Button
              disabled={isPending}
              type="submit"
              className="w-full"
            >
              パスワードをリセット
            </Button>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
