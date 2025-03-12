'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import CartDrawerView from './cart-drawer-view';
import { useParams, usePathname } from 'next/navigation';
import { routes } from '@/config/routes';
import { useCart } from '@/store/quick-cart/cart.context';

const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
  ssr: false,
});
const FloatingCartButton = dynamic(
  () => import('@/app/shared/floating-cart-button'),
  {
    ssr: false,
  }
);

export default function CartDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const { products } = useCart();

  // list of included pages
  const includedPaths: string[] = [
    routes.eCommerce.shop,
  ];

  const isPathIncluded = includedPaths.some((path) => pathname !== path);

  return (
    <>
      {isPathIncluded ? (
        <FloatingCartButton
          onClick={() => setOpenDrawer(true)}
          className="top-1/2 -translate-y-1/2 bg-primary dark:bg-primary"
        />
      ) : null}
      <Drawer
        isOpen={openDrawer ?? false}
        onClose={() => setOpenDrawer(false)}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
        containerClassName="dark:bg-gray-100 max-h-dvh"
        className="z-[2247483648]"
      >
        <CartDrawerView
          setOpenDrawer={setOpenDrawer}
          // clearItemFromCart={() => {}}
          // removeItemFromCart={() => {}}
          // addItemToCart={() => {}}
          items={products}
        />
      </Drawer>
    </>
  );
}
