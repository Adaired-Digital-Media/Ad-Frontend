import WebsiteLayout from '@/layouts/website/layout';
import { SessionProvider } from 'next-auth/react';
export default function DefaulWebsitetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <WebsiteLayout>{children}</WebsiteLayout>
    </SessionProvider>
  );
}
