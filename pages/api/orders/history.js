import Order from '@/models/Order';
import db from '@/utils/db';
import { getSession } from 'next-auth/react';

export default async function getOrdersHistory(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }
  const { user } = session;
  await db.connect();
  const orders = await Order.find({ user: user._id });
  await db.disconnect();
  res.send(orders);
}
