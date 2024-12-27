import WebsiteLayout from '@/layouts/website/layout';

export default function DefaulWebsitetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WebsiteLayout>{children}</WebsiteLayout>;
}
