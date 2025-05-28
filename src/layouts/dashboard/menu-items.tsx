import { routes } from '@/config/routes';
import {
  PiShoppingCartDuotone,
  PiUserGearDuotone,
  PiBrowsersFill,
  PiShoppingBagDuotone,
  PiShapesDuotone,
  PiInvoiceDuotone,
  PiTicketDuotone,
  PiCurrencyDollarDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'Main Menu',
  },
  // label end
  {
    name: 'Visit Website',
    href: routes?.userDashboard?.website,
    icon: <PiBrowsersFill />,
  },

  {
    name: 'Dashboard',
    href: routes?.userDashboard?.dashboard,
    icon: <PiShapesDuotone />,
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
    href: routes.userDashboard.invoices,
    icon: <PiCurrencyDollarDuotone />,
    badge: '',
  },
  {
    name: 'Support',
  },
  //  label end
  {
    name: 'Tickets',
    href: routes?.userDashboard.tickets,
    icon: <PiTicketDuotone />,
  },
  // {
  //   name: 'Invoices',
  //   href: routes?.userDashboard.invoices,
  //   icon: <PiInvoiceDuotone />,
  // },

  //  label start
  // {
  //   name: 'Support',
  // },
  //  label end
];
