import SmallWidthContainer from '@web-components/SmallWidthContainer';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import CartTemplate from '@/app/shared/ecommerce/cart';

const pageHeader = {
  title: 'Cart',
  breadcrumb: [
    {
      name: 'Home',
      href: routes.userDashboard.website,
    },
    {
      href: routes.eCommerce.products,
      name: 'Expert Content Solutions',
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
        <SmallWidthContainer className="xl:py-10 2xl:py-10 3xl:py-10">
          <PageHeader
            title={pageHeader.title}
            breadcrumb={pageHeader.breadcrumb}
            className="mb-0 lg:mb-0"
          />
        </SmallWidthContainer>
      </div>
      <CartTemplate />
    </>
  );
}
