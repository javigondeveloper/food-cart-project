import bcrypt from 'bcryptjs';

const data = {
  products: [
    {
      name: 'French Bread',
      slug: 'French-Bread',
      brand: 'my Bakery',
      category: 'Bakery',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus auctor justo non pharetra. Suspendisse ut maximus sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae laoreet tellus. Mauris in felis vehicula, ullamcorper mauris sed, vulputate elit. Nam iaculis nulla nisi, vitae facilisis magna placerat id. Nullam bibendum ultricies lectus in mattis. Nulla vehicula est vel tincidunt posuere. Etiam scelerisque arcu nec ligula posuere efficitur. In vitae tristique ligula. Donec ac leo in orci accumsan gravida. Donec venenatis volutpat augue, nec facilisis libero ultrices et. Phasellus nulla neque, viverra vel est ac, imperdiet suscipit lacus.',
      image: '/images/bread.jfif',
      rating: 4.5,
      reviews: 10,
      stock: 30,
      price: 2.0,
      currency: 'EUR',
    },
    {
      name: ' packaged fresh chicken',
      slug: 'packaged-fresh-chicken',
      brand: 'the tasty chicken',
      category: 'farm',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus auctor justo non pharetra. Suspendisse ut maximus sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae laoreet tellus. Mauris in felis vehicula, ullamcorper mauris sed, vulputate elit. Nam iaculis nulla nisi, vitae facilisis magna placerat id. Nullam bibendum ultricies lectus in mattis. Nulla vehicula est vel tincidunt posuere. Etiam scelerisque arcu nec ligula posuere efficitur. In vitae tristique ligula. Donec ac leo in orci accumsan gravida. Donec venenatis volutpat augue, nec facilisis libero ultrices et. Phasellus nulla neque, viverra vel est ac, imperdiet suscipit lacus.',
      image: '/images/chicken.jfif',
      rating: 4.4,
      reviews: 8,
      stock: 10,
      price: 1.5,
      currency: 'EUR',
    },
    {
      name: 'bottled milk',
      slug: 'bottled-milk',
      brand: 'milky',
      category: 'dairy',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus auctor justo non pharetra. Suspendisse ut maximus sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae laoreet tellus. Mauris in felis vehicula, ullamcorper mauris sed, vulputate elit. Nam iaculis nulla nisi, vitae facilisis magna placerat id. Nullam bibendum ultricies lectus in mattis. Nulla vehicula est vel tincidunt posuere. Etiam scelerisque arcu nec ligula posuere efficitur. In vitae tristique ligula. Donec ac leo in orci accumsan gravida. Donec venenatis volutpat augue, nec facilisis libero ultrices et. Phasellus nulla neque, viverra vel est ac, imperdiet suscipit lacus.',
      image: '/images/milk_bottle.jfif',
      rating: 4.6,
      reviews: 15,
      stock: 15,
      price: 2.5,
      currency: 'EUR',
    },
    {
      name: 'orange juice',
      slug: 'orange-juice',
      brand: 'funny orange',
      category: 'juice',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus auctor justo non pharetra. Suspendisse ut maximus sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae laoreet tellus. Mauris in felis vehicula, ullamcorper mauris sed, vulputate elit. Nam iaculis nulla nisi, vitae facilisis magna placerat id. Nullam bibendum ultricies lectus in mattis. Nulla vehicula est vel tincidunt posuere. Etiam scelerisque arcu nec ligula posuere efficitur. In vitae tristique ligula. Donec ac leo in orci accumsan gravida. Donec venenatis volutpat augue, nec facilisis libero ultrices et. Phasellus nulla neque, viverra vel est ac, imperdiet suscipit lacus.',
      image: '/images/orange_juice.jfif',
      rating: 4.6,
      reviews: 5,
      stock: 11,
      price: 1.2,
      currency: 'EUR',
    },
    {
      name: 'red wine',
      slug: 'red-wine',
      brand: 'elixir',
      category: 'wine',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus auctor justo non pharetra. Suspendisse ut maximus sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae laoreet tellus. Mauris in felis vehicula, ullamcorper mauris sed, vulputate elit. Nam iaculis nulla nisi, vitae facilisis magna placerat id. Nullam bibendum ultricies lectus in mattis. Nulla vehicula est vel tincidunt posuere. Etiam scelerisque arcu nec ligula posuere efficitur. In vitae tristique ligula. Donec ac leo in orci accumsan gravida. Donec venenatis volutpat augue, nec facilisis libero ultrices et. Phasellus nulla neque, viverra vel est ac, imperdiet suscipit lacus.',
      image: '/images/wine.jfif',
      rating: 4.4,
      reviews: 8,
      stock: 20,
      price: 4.0,
      currency: 'EUR',
    },
  ],
  users: [
    {
      name: 'Nati',
      email: 'admin@example.com',
      password: bcrypt.hashSync('4f7Huyj8'),
      isAdmin: true,
    },
    {
      name: 'Andy',
      email: 'user@example.com',
      password: bcrypt.hashSync('NMk98kFr'),
      isAdmin: false,
    },
  ],
};

export default data;
