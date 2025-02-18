import Navbar from '@/app/(website)/common/Header';
import Footer from '@/app/(website)/common/Footer';
import LenisPrevent from '@core/utils/lenis-prevent';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <LenisPrevent />
      <Footer />
    </>
  );
}
