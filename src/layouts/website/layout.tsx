import Navbar from '@/app/(website)/common/Header';
import Footer from '@/app/(website)/common/Footer';
import LenisPrevent from '@core/utils/lenis-prevent';
import AnimatedCursor from 'react-animated-cursor';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AnimatedCursor
        innerSize={10}
        outerSize={30}
        color="26, 90, 151"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={1.7}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
        ]}
        innerStyle={{
          zIndex: 99999,
        }}
        outerStyle={{
          zIndex: 99999,
        }}
        showSystemCursor
      />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <LenisPrevent />
      <Footer />
    </div>
  );
}
