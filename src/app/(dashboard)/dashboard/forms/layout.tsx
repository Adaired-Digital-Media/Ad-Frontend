import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@shared/account-settings/navigation';

const pageHeader = {
  title: 'Account Settings',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: routes.userDashboard.accountSettings,
      name: 'Form',
    },
    {
      name: 'Account Settings',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} isDashboard/>
      <ProfileSettingsNav />
      {children}
    </>
  );
}
