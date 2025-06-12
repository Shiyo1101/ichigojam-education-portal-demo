'use client';

import BackButton from '@/components/Auth/button/back-button';
import SettingAccountForm from '@/components/Settings/setting-form/setting-accont-form';
import SettingPasswordForm from '@/components/Settings/setting-form/setting-password-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { UserSession } from '@/types/user';

const SettingFrom = ({ user }: { user: UserSession }) => {
  return (
    <Tabs
      defaultValue="account"
      className="sm:w-[400px] w-[350px]"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              アカウントの変更が行えます。変更内容を入力したら、「変更を保存」をクリックしてください。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SettingAccountForm user={user} />
          </CardContent>
          <CardFooter>
            <BackButton
              className=""
              href={'/'}
              label={'ホームに戻る'}
            />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>新しいパスワードを入力して変更が可能です</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SettingPasswordForm />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <BackButton
              className=""
              href={'/'}
              label={'ホームに戻る'}
            />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingFrom;
