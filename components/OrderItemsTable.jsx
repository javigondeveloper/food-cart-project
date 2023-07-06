import Image from 'next/image';
import Link from 'next/link';
import formatNumber from '@/utils/formatNumber';

function OrderItemsTable({ orderItems, orderCurrency }) {
  return (
    <table className="min-w-full ">
      <thead className="border-b">
        <tr className="relative">
          <th className="px-5 text-center min-w-[100px]">Item</th>
          <th className="p-5 text-right">Quantity</th>
          <th className="p-5 text-right">Price</th>
          <th className="p-5 text-right">Subtotal</th>
        </tr>
      </thead>

      <tbody>
        {orderItems.map((item) => (
          <tr key={item._id} className="border-b">
            <td>
              <Link
                href={`/product/${item.slug}`}
                className="flex items-center gap-2 p-1 min-w-[10rem]"
              >
                <div className="w-[60px] bg-white flex justify-center py-1">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                  ></Image>
                </div>
                <div className=" whitespace-nowrap ">{item.name}</div>
              </Link>
            </td>

            <td className="p-5 text-right">{item.quantity}</td>

            <td className="p-5 text-right">
              {formatNumber(item.price, orderCurrency)}
            </td>

            <td className="p-5 text-right">
              {formatNumber(item.quantity * item.price, orderCurrency)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderItemsTable;
