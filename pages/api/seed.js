import db from '@/utils/db';
// import User from '@/models/User';
import data from '@/utils/data';
import Product from '@/models/Product';

const createFakeProducts = ({ start, quantity }) => {
  if (start < 0 || quantity < 0) return null;

  let newProducs = [];
  for (let i = start; i < quantity + start; i++) {
    newProducs.push({
      name: `Product ${i}`,
      slug: `product-${i}`,
      brand: `brand product`,
      category: `category product`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus auctor justo non pharetra. Suspendisse ut maximus sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae laoreet tellus. Mauris in felis vehicula',
      image: `/images/product-image-banner.png`,
      rating: 4.4,
      reviews: 8,
      stock: 20,
      price: 4.0,
      currency: 'EUR',
    });
  }
  return newProducs;
};

const handler = async (req, res) => {
  await db.connect();
  // await User.deleteMany();
  // await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await Product.insertMany(createFakeProducts({ start: 14, quantity: 100 }));
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};

export default handler;
