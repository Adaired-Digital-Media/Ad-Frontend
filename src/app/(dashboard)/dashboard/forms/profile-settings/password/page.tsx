import { metaObject } from '@/config/site.config';
import PasswordSettingsView from '@/app/shared/account-settings/password-settings';

export const metadata = {
  ...metaObject('Password'),
};

export default function ProfileSettingsFormPage() {
  return <PasswordSettingsView />;
}
