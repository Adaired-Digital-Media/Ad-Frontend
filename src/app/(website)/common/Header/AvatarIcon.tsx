'use client';
import { Dropdown, Text, Avatar } from 'rizzui';
import { cn } from '@core/utils/class-names';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { routes } from '@/config/routes';
export default function UserAvatarIcon({ session }: { session: any }) {
  const [firstName, lastName] = session?.user?.name?.split(' ') || ['', ''];
  const initials =
    `${firstName?.charAt(0)}${lastName?.charAt(0) || ''}`.toUpperCase();
  return (
    <>
      <Dropdown placement="bottom-end">
        <Dropdown.Trigger>
          <Avatar
            name={session?.user?.name}
            initials={initials}
            size="sm"
            className={cn(`cursor-pointer`)}
          />
        </Dropdown.Trigger>
        <Dropdown.Menu className="w-56 divide-y text-gray-600">
          <Dropdown.Item className="hover:bg-transparent">
            <Avatar
              name={session?.user?.name}
              initials={initials}
              size="sm"
              className={cn(`cursor-pointer`)}
            />
            <span className="ml-2 text-start">
              <Text className="font-medium leading-tight text-gray-900">
                {session?.user?.name}
              </Text>
              <Text>
                {' '}
                {(session?.user?.email ?? '').length > 25
                  ? `${(session?.user?.email ?? '').slice(0, 20)}...`
                  : session?.user?.email}
              </Text>
            </span>
          </Dropdown.Item>
          <div className="mb-2 mt-3 pt-2">
            <Link href={routes.eCommerce.cart}>
              <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                Cart
              </Dropdown.Item>
            </Link>
            <Link href={routes.userDashboard.dashboard}>
              <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50">
                Dashboard
              </Dropdown.Item>
            </Link>
          </div>
          <div className="mt-2 pt-2">
            <Dropdown.Item
              className="hover:bg-gray-900 hover:text-gray-50"
              onClick={() =>
                signOut({
                  callbackUrl: routes.auth.signIn,
                })
              }
            >
              Sign Out
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
