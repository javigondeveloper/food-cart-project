import Link from 'next/link';
import { Menu } from '@headlessui/react';

function MenuBox(props) {
  const { session, clickHandler } = props;
  return (
    <Menu as="div" className="relative inline-block ">
      <Menu.Button className="text-blue-600 hover:text-blue-800">
        {session.user.name}
      </Menu.Button>

      <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-cyan-400 rounded-lg p-2">
        <Menu.Item>
          <Link
            className="dropdown-link text-white hover:bg-cyan-300 hover:text-white"
            href="/profile"
          >
            Profile
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link
            className="dropdown-link text-white hover:bg-cyan-300 hover:text-white"
            href="/order-history"
          >
            Order History
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link
            className="dropdown-link text-white hover:bg-cyan-300 hover:text-white"
            href="#"
            onClick={clickHandler}
          >
            Logout
          </Link>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default MenuBox;
