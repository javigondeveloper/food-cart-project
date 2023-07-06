import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import formatDate from '@/utils/formatDate';
import formatNumber from '@/utils/formatNumber';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';

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
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    default:
      return state;
  }
}

function OrderScreen() {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
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
    if (!order._id || successPay || order._id !== orderId) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const response = await fetch('/api/keys/paypal');
        const data = await response.json();
        const clientId = data;
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: order.currency,
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successPay]);

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
    currency,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const response = await fetch(`/api/orders/${order._id}/pay`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        });
        const data = await response.json();
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid successfully');
      } catch (error) {
        dispatch({ type: 'PAY_FAIL', payload: getError(error) });
        toast.error(getError(error));
      }
    });
  }

  function onError(error) {
    toast.error(getError(error));
  }

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
                <div className="altert-success">
                  Delivered at {formatDate(deliveredAt)}
                </div>
              ) : (
                <div className="alert-error">Not Delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">
                  Paid at {formatDate(paidAt)}
                </div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>

            <div className="card p-5 overflow-auto">
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
                      <td className="p-5 text-right">
                        {formatNumber(item.price, currency)}
                      </td>
                      <td className="p-5 text-right">
                        {formatNumber(item.quantity * item.price, currency)}
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
                  <div>{formatNumber(itemsPrice, currency)}</div>
                </div>
              </li>

              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>{formatNumber(taxPrice, currency)}</div>
                </div>
              </li>

              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>{formatNumber(shippingPrice, currency)}</div>
                </div>
              </li>

              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>{formatNumber(totalPrice, currency)}</div>
                </div>
              </li>

              {!isPaid && (
                <li>
                  {isPending ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="w-full">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <div>Loading...</div>}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;

export default OrderScreen;
