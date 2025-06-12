'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import PacmanLoader from 'react-spinners/PacmanLoader';
import type { z } from 'zod';

import { settingPassword } from '@/actions/settings/setting-password';
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
import { SettingPasswordSchema } from '@/utils/schema';

const SettingPasswordForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const settingPasswordForm = useForm<z.infer<typeof SettingPasswordSchema>>({
    resolver: zodResolver(SettingPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const onSettingPasswordFormSubmit = (values: z.infer<typeof SettingPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      settingPassword(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...settingPasswordForm}>
      <form
        onSubmit={settingPasswordForm.handleSubmit(onSettingPasswordFormSubmit)}
        className="space-y-4"
      >
        <div className="space-y-2">
          <FormField
            control={settingPasswordForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>現在のパスワード</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="*******"
                  />
                </FormControl>
                <FormMessage />
                <Link
                  className="text-sm hover:underline text-primary"
                  href="/auth/reset"
                >
                  パスワードをお忘れですか？
                </Link>
              </FormItem>
            )}
          />
          <FormField
            control={settingPasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新しいパスワード</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="*******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={settingPasswordForm.control}
            name="newPasswordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新しいパスワード（確認）</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="*******"
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
            type="submit"
            disabled={isPending || !settingPasswordForm.formState.isDirty}
          >
            パスワードを変更
          </Button>
        )}
      </form>
    </Form>
  );
};

export default SettingPasswordForm;
