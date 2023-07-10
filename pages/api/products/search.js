import { default as Product } from '@/models/Product';
import { default as db } from '@/utils/db';

const searchProduct = async (req, res) => {
  await db.connect();
  const { product } = req.query;
  const productToSearch = new RegExp(product, 'i');
  const result = await Product.find({
    $or: [
      { name: productToSearch },
      { category: productToSearch },
      { brand: productToSearch },
    ],
  });
  db.disconnect();
  res.send({ result });
};

export default searchProduct;
