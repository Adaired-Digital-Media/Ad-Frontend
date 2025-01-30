'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { PiShoppingCartBold } from 'react-icons/pi';
import { cn } from '../../@core/utils/class-names';

const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
  ssr: false,
});

interface FloatingCartProps {
  className?: string;
}

export default function FloatingCart({ className }: FloatingCartProps) {
  const pathname = usePathname();
  const [openDrawer, setOpenDrawer] = useState(false);

  const isECom = pathname.includes('ecommerce');

  const isPathExcluded = false;
  return (
    isECom &&
    !isPathExcluded && (
      <>
        <button
          className={cn(
            'fixed right-2 top-1/2 z-20 grid -translate-y-1/2 place-content-center gap-1 rounded-md bg-primary p-3 text-xs font-semibold text-white shadow-[0_25px_50px_-12px_#000000]',
            className
          )}
          onClick={() => setOpenDrawer(true)}
        >
          <PiShoppingCartBold className="mx-auto h-[18px] w-auto" />
          {/* {totalItems} {totalItems > 1 ? 'Items' : 'Item'} */}
          5858585858
        </button>
        <Drawer
          size="sm"
          isOpen={openDrawer ?? false}
          onClose={() => setOpenDrawer(false)}
          overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
          containerClassName="dark:bg-gray-100"
          className="z-[9999]"
        >
          hello
          {/* <CartDrawerView
              setOpenDrawer={setOpenDrawer}
              clearItemFromCart={clearItemFromCart}
              removeItemFromCart={removeItemFromCart}
              addItemToCart={addItemToCart}
              items={items}
              total={total}
            /> */}
        </Drawer>
      </>
    )
  );
}
