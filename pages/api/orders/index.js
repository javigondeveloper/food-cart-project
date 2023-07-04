import { getToken } from 'next-auth/jwt';
import Order from '@/models/Order';
import db from '@/utils/db';

const postOrder = async (req, res) => {
  const token = await getToken({ req });

  if (!token) {
    return res.status(401).json({ message: 'signin required' });
  }
  const { _id: userId } = token;
  try {
    await db.connect();
    const newOrder = new Order({
      ...req.body,
      user: userId,
    });

    const order = await newOrder.save();
    res.status(201).send(order);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  } finally {
    db.disconnect();
  }
};

export default postOrder;
