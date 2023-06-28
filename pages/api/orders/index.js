import { getToken } from 'next-auth/jwt';
import Order from '@/models/Order';
import db from '@/utils/db';

const postOrder = async (req, res) => {
  const token = await getToken({ req });

  if (!token) {
    return res.status(401).send('signin required');
  }

  const { userId } = token._id;

  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: userId,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};

export default postOrder;
