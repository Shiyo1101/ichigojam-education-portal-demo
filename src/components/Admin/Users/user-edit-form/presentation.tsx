'use client';

import { Select } from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { SyncLoader } from 'react-spinners';
import { toast } from 'sonner';
import type { z } from 'zod';

import { editUser } from '@/actions/admin/edit-user';
import FormError from '@/components/common/form/form-error';
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
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { UserSession } from '@/types/user';
import type { EditUserSchema } from '@/utils/schema';

export const UserEditFormPresentation = ({ user }: { user: UserSession }) => {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const editUserForm = useForm<z.infer<typeof EditUserSchema>>({
    defaultValues: {
      name: user.name || '',
      role: user.role,
    },
  });

  const onEditUserFormSubmit = (values: z.infer<typeof EditUserSchema>) => {
    setError('');

    startTransition(() => {
      if (!user.id) {
        return setError('User ID is missing');
      }

      editUser(user.id, values).then((data) => {
        setError(data.error);
        if (data.success) {
          toast.success('ユーザー情報を変更しました');
          router.push('/admin/users');
        }
      });
    });
  };

  return (
    <main className="p-4">
      <Form {...editUserForm}>
        <form
          onSubmit={editUserForm.handleSubmit(onEditUserFormSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <FormField
              control={editUserForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Yamada Taro"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editUserForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="GUEST" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="GENERAL">GENERAL</SelectItem>
                      <SelectItem value="GUEST">GUEST</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          {isPending && <SyncLoader />}
          {!isPending && (
            <Button
              type="submit"
              disabled={isPending || !editUserForm.formState.isDirty}
            >
              ユーザー情報を変更
            </Button>
          )}
        </form>
      </Form>
    </main>
  );
};
