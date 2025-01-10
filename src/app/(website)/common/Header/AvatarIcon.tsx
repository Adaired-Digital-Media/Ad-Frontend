'use client';
import { Dropdown, Text, Avatar } from 'rizzui';
import { cn } from '@core/utils/class-names';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function UserAvatarIcon({ session }: { session: any }) {
  const router = useRouter();

  const [firstName, lastName] = session?.user?.name?.split(' ') || ['', ''];
  const initials =
    `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  return (
    <div>
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
              <Text>{session?.user?.email}</Text>
            </span>
          </Dropdown.Item>
          <div className="mb-2 mt-3 pt-2">
            <Dropdown.Item
              className="hover:bg-gray-900 hover:text-gray-50"
              onClick={() => {
                router.push('/dashboard');
              }}
            >
              Dashboard
            </Dropdown.Item>
          </div>
          <div className="mt-2 pt-2">
            <Dropdown.Item
              className="hover:bg-gray-900 hover:text-gray-50"
              onClick={() => signOut()}
            >
              Sign Out
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
