import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return { ...state, loading: true, error: '' };
    }
    case 'FETCH_SUCCESS': {
      return { ...state, loading: false, order: action.payload, error: '' };
    }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderScreen() {
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const response = await fetch(`/api/orders/${orderId}`);
        const newOrder = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: newOrder });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    if (!order._id || order._id !== orderId) {
      fetchOrder();
    }
  }, [order, orderId]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">Order {orderId}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">error</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName} , {shippingAddress.address}, {'  '}
                {shippingAddress.city}, {shippingAddress.postalCode}, {'  '}
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="altert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not Delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="altert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="px-5 text-rght">Quantity</th>
                    <th className="px-5 text-rght">Price</th>
                    <th className="px-5 text-rght">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr className="border-b" key={item._id}>
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
                      <td className="p-5 text-right">{item.taxPrice}</td>
                      <td className="p-5 text-right">
                        Eur &nbsp;{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Sumary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>Eur &nbsp;{itemsPrice}</div>
                </div>
              </li>

              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>Eur &nbsp;{taxPrice}</div>
                </div>
              </li>

              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>Eur &nbsp;{shippingPrice}</div>
                </div>
              </li>

              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>Eur &nbsp;{totalPrice}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;

export default OrderScreen;
