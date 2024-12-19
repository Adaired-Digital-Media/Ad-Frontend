import CartTemplate from '@/app/shared/ecommerce/cart';
import SmallWidthContainer from '../../components/SmallWidthContainer';
import { cn } from '../../../../@core/utils/class-names';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
const pageHeader = {
  title: 'Cart',
  breadcrumb: [
    {
      name: 'Home',
      href: routes.eCommerce.dashboard,
    },
    {
      href: routes.eCommerce.products,
      name: 'E-Commerce',
    },
    {
      name: 'Cart',
    },
  ],
};

export default function CartPageWrapper() {
  return (
    <>
      <div className="bg-[#F1F8FF]">
        <SmallWidthContainer className=' xl:py-10 2xl:py-10 3xl:py-10 '>
          <PageHeader
            title={pageHeader.title}
            breadcrumb={pageHeader.breadcrumb}
            className='mb-0 lg:mb-0'
          />
        </SmallWidthContainer>
        {/* <div className="h-[60px] w-11/12 max-w-[600px] rounded-bl-full rounded-tl-full bg-[#D2E9FF]"></div> */}
      </div>
      <SmallWidthContainer className={cn(`!pt-0`)}>
        <CartTemplate />
      </SmallWidthContainer>
    </>
  );
}
