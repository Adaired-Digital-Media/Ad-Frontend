import { cn } from '@core/utils/class-names';
import Header from './header';

const ZohoLeadCreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="flex w-full flex-col">
        <Header />
        {children}
      </div>
    </main>
  );
};
export default ZohoLeadCreateLayout;
