import db from '@/utils/db';
import Order from '@/models/Order';
import { getToken } from 'next-auth/jwt';

const payHeandler = async (req, res) => {
  const token = await getToken({ req });
  if (!token) {
    return res.status(401).send('Error: signin required');
  }
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: 'Error: order is already paid' });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'order paid successfully', order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Error: order not found' });
  }
};

export default payHeandler;
