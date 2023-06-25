import { default as Product } from '@/models/Product';
import { default as db } from '@/utils/db';

const getProductbyId = async (req, res) => {
  await db.connect();
  const { id } = req.query;
  const product = await Product.findById(id).lean();
  db.disconnect();

  res.json(product);
};

export default getProductbyId;
