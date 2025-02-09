import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Text from './Text';

type MenuLinkProps = {
  title: string;
  link: string;
  icon: string;
  isActive?: boolean;
};

const MenuLink: React.FC<MenuLinkProps> = ({
  title = 'Menu',
  link = '/',
  icon = '',
  isActive = false,
}) => {
  return (
    <Link href={link} className={`flex items-center gap-3 py-2`}>
      <Image src={icon} alt="sidebar-icon" width={18} height={18} />
      <Text
        caption={title}
        className={`hover:text-white transition-colors ${
          isActive ? 'text-white' : 'text-[#9D9D9D]'
        }`}
      />
    </Link>
  );
};

export default MenuLink;
