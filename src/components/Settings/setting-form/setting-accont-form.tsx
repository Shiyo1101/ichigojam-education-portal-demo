'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { PacmanLoader } from 'react-spinners';
import type { z } from 'zod';

import { settingAccount } from '@/actions/settings/setting-account';
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
import type { UserSession } from '@/types/user';
import { SettingAccountSchema } from '@/utils/schema';

const SettingAccountForm = ({ user }: { user: UserSession }) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    name: user.name || '',
    email: user.email || '',
  };

  const settingAccountForm = useForm<z.infer<typeof SettingAccountSchema>>({
    resolver: zodResolver(SettingAccountSchema),
    defaultValues: defaultValues,
  });

  const onSettingAccountFormSubmit = (values: z.infer<typeof SettingAccountSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      settingAccount(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...settingAccountForm}>
      <form
        onSubmit={settingAccountForm.handleSubmit(onSettingAccountFormSubmit)}
        className="space-y-4"
      >
        <div className="space-y-2">
          <FormField
            control={settingAccountForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder={user?.name || 'Yamada Taro'}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={settingAccountForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder={user?.email || 'l-community@gmail.com'}
                    type="email"
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
            disabled={isPending || !settingAccountForm.formState.isDirty}
          >
            変更を保存
          </Button>
        )}
      </form>
    </Form>
  );
};

export default SettingAccountForm;
