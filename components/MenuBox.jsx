import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { Store } from '@/store';
import { signOut } from 'next-auth/react';

function MenuBox({ session, cartItemsCount }) {
  const { dispatch } = useContext(Store);

  const logoutClickHandler = () => {
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <Menu as="div" className="relative inline-block  ">
      <Menu.Button className="text-blue-600 hover:text-blue-800 hidden md:flex items-center">
        {session.user.name}
      </Menu.Button>
      <Menu.Button className="text-blue-600 hover:text-blue-800 min-w-[24px] flex md:hidden items-center">
        <Bars3Icon />
      </Menu.Button>

      <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-cyan-400 rounded-lg p-2">
        <div className="border-b flex md:hidden text-white justify-center pointer-events-none mb-4 pb-1">
          <h1>{session.user.name}</h1>
        </div>
        <Menu.Item>
          <Link href="/cart" className="block md:hidden p-2 text-white">
            Cart
            {cartItemsCount > 0 && (
              <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </Menu.Item>

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
            onClick={logoutClickHandler}
          >
            Logout
          </Link>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default MenuBox;
