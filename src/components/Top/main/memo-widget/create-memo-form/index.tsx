'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { createMemoAction } from '@/actions/top/memo';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { mediaQuery, useMediaQuery } from '@/hooks/use-media-query';
import { MemoSchema } from '@/utils/schema';

type EditMemoFormProps = {
  setIsCreateMemoDialogOpen: (value: boolean) => void;
};

const CreateMemoForm = ({ setIsCreateMemoDialogOpen }: EditMemoFormProps) => {
  const isSp = useMediaQuery(mediaQuery.sp);
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    content: '',
  };

  const createMemoForm = useForm<z.infer<typeof MemoSchema>>({
    resolver: zodResolver(MemoSchema),
    defaultValues: defaultValues,
  });

  const onCreateMemoFormSubmit = (values: z.infer<typeof MemoSchema>) => {
    startTransition(() => {
      createMemoAction({
        memo: values,
      }).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }

        if (data.error) {
          toast.error(data.error);
        }
        setIsCreateMemoDialogOpen(false);
      });
    });
  };

  return (
    <Form {...createMemoForm}>
      <form
        onSubmit={createMemoForm.handleSubmit(onCreateMemoFormSubmit)}
        className="space-y-4"
      >
        <div className="space-y-2">
          <FormField
            control={createMemoForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="メモ内容を入力してください"
                    rows={isSp ? 5 : 3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isPending || !createMemoForm.formState.isDirty}
        >
          作成
        </Button>
      </form>
    </Form>
  );
};

export default CreateMemoForm;
