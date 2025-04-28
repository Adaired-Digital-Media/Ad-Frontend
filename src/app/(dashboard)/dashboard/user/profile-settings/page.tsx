import ProfileSettingsView from '@/app/shared/account-settings/profile-settings';
import { auth } from '@/auth';
import { metaObject } from '@/config/site.config';
import { Session } from 'next-auth';

export const metadata = {
  ...metaObject('Profile'),
};

export default async function ProfileSettingsFormPage() {
  const session = await auth();
  if (!session) {
    throw new Error('Session not found');
  }
  return <ProfileSettingsView session={session} />;
}
