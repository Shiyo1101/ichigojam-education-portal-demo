'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Memo } from '@prisma/client';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { deleteMemoAction } from '@/actions/top/memo';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { DeleteMemoSchema } from '@/utils/schema';

type DeleteMemoFormProps = {
  setIsDeleteMemoDialogOpen: (value: boolean) => void;
  memo: Memo;
};

const DeleteMemoForm = ({ setIsDeleteMemoDialogOpen, memo }: DeleteMemoFormProps) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    delete: false,
  };

  const deleteMemoForm = useForm<z.infer<typeof DeleteMemoSchema>>({
    resolver: zodResolver(DeleteMemoSchema),
    defaultValues: defaultValues,
  });

  const onDeleteMemoFormSubmit = () => {
    startTransition(() => {
      deleteMemoAction({
        memoInfo: {
          memoId: memo.id,
          authorId: memo.authorId,
        },
      }).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }

        setIsDeleteMemoDialogOpen(false);
      });
    });
  };

  return (
    <Form {...deleteMemoForm}>
      <form
        onSubmit={deleteMemoForm.handleSubmit(onDeleteMemoFormSubmit)}
        className="space-y-4"
      >
        <div className="space-y-2">
          <FormField
            control={deleteMemoForm.control}
            name="delete"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5 mr-2">
                  <FormLabel>確認チェック</FormLabel>
                  <FormDescription className="whitespace-pre-wrap">
                    {`内容：\n${memo.content}`}
                  </FormDescription>
                </div>

                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          variant="destructive"
          disabled={isPending || !deleteMemoForm.formState.isDirty}
        >
          削除
        </Button>
      </form>
    </Form>
  );
};

export default DeleteMemoForm;
