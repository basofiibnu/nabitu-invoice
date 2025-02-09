'use client';

import Image from 'next/image';
// src/components/Sidebar.tsx
import { usePathname } from 'next/navigation';
import Text from './invoices/Atom/Text';
import MenuLink from './invoices/Atom/MenuLink';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-[#1C2434] text-white h-screen px-9 py-7">
      <Image
        src={'/logo.svg'}
        width={166}
        height={45}
        alt="logo"
        className="mb-10"
      />

      <nav>
        <Text
          className="font-semibold text-sm text-[#9D9D9D] uppercase"
          caption="Menu"
        />

        <ul className="space-y-2 mt-4">
          <li>
            <MenuLink
              title="Add Invoice"
              link="/invoices/add"
              icon={
                pathname === '/invoices/add'
                  ? '/letter-white.svg'
                  : '/letter.svg'
              }
              isActive={pathname === '/invoices/add'}
            />
          </li>
          <li>
            <MenuLink
              title="List Invoice"
              link="/invoices/list"
              icon={
                pathname === '/invoices/list'
                  ? '/list-white.svg'
                  : '/list.svg'
              }
              isActive={pathname === '/invoices/list'}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
