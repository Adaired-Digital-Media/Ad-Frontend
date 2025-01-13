import WebsiteLayout from '@/layouts/website/layout';
import { SessionProvider } from 'next-auth/react';
import { ReactLenis } from '@core/utils/lenis';
export default function DefaulWebsitetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <WebsiteLayout>
        <ReactLenis root>{children}</ReactLenis>
      </WebsiteLayout>
    </SessionProvider>
  );
}
