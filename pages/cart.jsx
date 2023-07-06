import { useContext, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import formatNumber from '@/utils/formatNumber';
import { Store } from '@/store';

export default function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { data: session } = useSession();
  const {
    cart: { cartItems },
  } = state;

  // solving hydration problem
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCartEmpty(false);
    } else {
      setIsCartEmpty(true);
    }
  }, [cartItems]);

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  const handleCheckout = () => {
    session?.user
      ? router.push('/shipping')
      : router.push('login?redirect=/shipping');
  };

  return (
    <Layout title="Shopping Cart">
      <div className="flex flex-col flex-grow">
        <h1 className="mb-4 text-xl">Shopping Cart</h1>
        {isCartEmpty ? (
          <div>
            Cart is empty. <Link href="/">Go shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col justify-between flex-grow md:flex-row md:gap-5">
            {/* Cart Items */}
            <div className=" card h-fit overflow-x-auto mb-4 w-full">
              <table className="min-w-full  ">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="border-b ">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className=" flex gap-4  items-center min-w-min mr-8 pr-4"
                        >
                          <div className="flex justify-center items-center w-[60px] my-2 p-2 bg-white">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </div>
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.stock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">
                        {formatNumber(item.price, item.currency)}
                      </td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Sumary */}
            <div className="card h-fit p-5 min-w-[15rem]">
              <div className="pb-3 text-lg flex justify-between">
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}):{' '}
                <span className="whitespace-nowrap">
                  {formatNumber(
                    cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
                    cartItems[0]?.currency
                  )}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="primary-button w-full"
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
