import { ReactLenis } from 'lenis/react';
import Navbar from '@/app/(website)/common/Header';
import Footer from '@/app/(website)/common/Footer';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </ReactLenis>
  );
}
