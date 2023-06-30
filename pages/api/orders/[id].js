import Order from '@/models/Order';
import db from '@/utils/db';
import { getSession } from 'next-auth/react';

const getOrderById = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin requred');
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};

export default getOrderById;
