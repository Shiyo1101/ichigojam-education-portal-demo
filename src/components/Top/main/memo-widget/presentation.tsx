'use client';

import type { Memo } from '@prisma/client';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import type { Author } from '@/types/auhor';
import type { UserSession } from '@/types/user';

import CreateMemoForm from './create-memo-form';
import DeleteMemoForm from './delete-memo-form';
import EditMemoForm from './editｰmemo-form';

type MemoWidgetPresentationProps = {
  memos: (Memo & {
    author: {
      name: Author['name'];
    };
  })[];
  me: UserSession;
};

export const MemoWidgetPresentation = ({ memos, me }: MemoWidgetPresentationProps) => {
  const [isCreateMemoDialogOpen, setIsCreateMemoDialogOpen] = useState(false);

  const [editingMemoId, setEditingMemoId] = useState<string | null>(null);
  const [deletingMemoId, setDeletingMemoId] = useState<string | null>(null);

  return (
    <Card className="max-h-[450px] overflow-auto">
      <CardHeader className="flex flex-row justify-between items-center w-auto">
        <CardTitle className="text-left text-xl lg:text-2xl">メモ一覧</CardTitle>
        <Dialog
          open={isCreateMemoDialogOpen}
          onOpenChange={setIsCreateMemoDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-20">
              <PlusIcon />
              作成
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[330px] sm:w-[550px]">
            <DialogHeader>
              <DialogTitle>メモを作成</DialogTitle>
            </DialogHeader>
            <CreateMemoForm setIsCreateMemoDialogOpen={setIsCreateMemoDialogOpen} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Table className="w-full overflow-x-scroll">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">記入者</TableHead>
              <TableHead className="min-w-[300px]">内容</TableHead>
              <TableHead className="md:w-[100px] w-16">作成日</TableHead>
              <TableHead className="md:w-[100px] w-16">更新日</TableHead>
              <TableHead className="md:w-[125px] w-16">編集</TableHead>
              <TableHead className="md:w-[125px] w-16">削除</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memos.map((memo) => (
              <TableRow key={memo.id}>
                <TableCell>{memo.author.name}</TableCell>
                <TableCell className="whitespace-pre-wrap">{memo.content}</TableCell>
                <TableCell>{formatDate(memo.createdAt)}</TableCell>
                <TableCell>{formatDate(memo.updatedAt)}</TableCell>
                <TableCell className="item-center">
                  <Dialog
                    open={editingMemoId === memo.id}
                    onOpenChange={(isOpen) => setEditingMemoId(isOpen ? memo.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        disabled={me.role !== 'ADMIN' && memo.authorId !== me.id}
                      >
                        編集する
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[330px] sm:w-[550px]">
                      <DialogHeader>
                        <DialogTitle>メモを編集</DialogTitle>
                        <DialogDescription>内容を入力して保存してください。</DialogDescription>
                      </DialogHeader>
                      <EditMemoForm
                        setIsEditMemoDialogOpen={() => setEditingMemoId(null)}
                        memo={memo}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="item-center">
                  <Dialog
                    open={deletingMemoId === memo.id}
                    onOpenChange={(isOpen) => setDeletingMemoId(isOpen ? memo.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={me.role !== 'ADMIN' && memo.authorId !== me.id}
                      >
                        削除する
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[330px] sm:w-[550px]">
                      <DialogHeader>
                        <DialogTitle>メモを削除</DialogTitle>
                      </DialogHeader>
                      <DeleteMemoForm
                        setIsDeleteMemoDialogOpen={() => setDeletingMemoId(null)}
                        memo={memo}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
