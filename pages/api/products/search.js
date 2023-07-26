import Product from '@/models/Product';
import db from '@/utils/db';

const searchProduct = async (req, res) => {
  const { page = 1, limit = 10, product } = req.query;

  const pageNr = parseInt(page);
  const limitNr = parseInt(limit);

  if (isNaN(pageNr) || isNaN(limitNr)) {
    return res.status(400).json({ message: 'Bad Params' });
  }

  try {
    await db.connect();
    const productToSearch = new RegExp(product, 'i');
    const query = {
      $or: [
        { name: productToSearch },
        { category: productToSearch },
        { brand: productToSearch },
      ],
      stock: { $gt: 0 },
    };
    const documents = await Product.countDocuments(query);

    const totalPages = Math.ceil(documents / limitNr);

    const result = await Product.find(query)
      .skip((pageNr - 1) * limitNr)
      .limit(limitNr);

    db.disconnect();
    res.send({ documents, totalPages, result });
  } catch (error) {
    return res.json({ message: error.message });
  } finally {
    db.disconnect();
  }
};

export default searchProduct;
