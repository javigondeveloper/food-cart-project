import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/CheckoutWizard';
import { Store } from '@/utils/Store';
import { getError } from '@/utils/error';
import formatNumber from '@/utils/formatNumber';

export default function PlaceOrderScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cartItems, shippingAddress, paymentMethod } = state.cart;
  const [loading, setLoading] = useState(false);
  const [orderCurrency, setOrderCurrency] = useState('');

  const round2 = (num) => Math.round(num * 100) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // depends on business policy
  const taxPrice = round2(itemsPrice * 0.15); // depends on tax rates
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const orderData = {
    orderItems: cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    currency: orderCurrency,
  };

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  useEffect(() => {
    setOrderCurrency(cartItems[0]?.currency);
  }, [cartItems]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const newOrder = await response.json();

      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      router.push(`/order/${newOrder._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>{' '}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName} , {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              <div className="mt-2">
                <Link href="/shipping">Edit</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr className="relative">
                    <th className="px-5 text-center min-w-[100px]">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center gap-1"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <div>{item.name}</div>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">
                        {formatNumber(item.price, orderCurrency)}
                      </td>
                      <td className="p-5 text-right">
                        {formatNumber(
                          item.quantity * item.price,
                          orderCurrency
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-2">
                <Link href="/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div className="card p-5 h-max">
            <h2 className="mb-2 text-lg">Order Sumary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>{formatNumber(itemsPrice, orderCurrency)}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>{formatNumber(taxPrice, orderCurrency)}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shpping</div>
                  <div>{formatNumber(shippingPrice, orderCurrency)}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>{formatNumber(totalPrice, orderCurrency)}</div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="primary-button w-full"
                >
                  {loading ? 'Loading...' : 'Place Order'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
