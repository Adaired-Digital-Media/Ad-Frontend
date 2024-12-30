import { routes } from '@/config/routes';
import {
  PiShoppingCartDuotone,
  PiUserGearDuotone,
  PiBrowsersFill,
  PiShoppingBagDuotone,
  PiInvoiceDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Visit Website',
    href: routes?.userDashboard?.website,
    icon: <PiBrowsersFill />,
  },

  // label start
  {
    name: 'User',
  },
  // label end
  {
    name: 'Account Settings',
    href: routes.userDashboard.accountSettings,
    icon: <PiUserGearDuotone />,
  },

  //  label start
  {
    name: 'Shop',
  },
  //  label end
  {
    name: 'Cart',
    href: routes?.userDashboard.cart,
    icon: <PiShoppingCartDuotone />,
  },
  {
    name: 'Orders',
    href: routes?.userDashboard.orders,
    icon: <PiShoppingBagDuotone />,
  },
  {
    name: 'Invoices',
    href: routes?.userDashboard.invoices,
    icon: <PiInvoiceDuotone />,
  },

  //  label start
  // {
  //   name: 'Support',
  // },
  //  label end
];
