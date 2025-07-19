import mongoose from "mongoose";
import { Product } from "./src/models/products.model.js"; // Adjust this path
import dotenv from "dotenv";
dotenv.config();

// Seller IDs you provided
const sellerIds = [
  '687becbd2a8ced1f5109c84e',
  '687becbd2a8ced1f5109c84f',
  '687becbd2a8ced1f5109c850',
  '687becbd2a8ced1f5109c851'
];

const categories = [
  'Fashion',
  'Electronics',
  'Books',
  'Home & Kitchen',
  'Toys',
  'Sports',
  'Beauty',
  'Automotive',
  'Grocery'
];

// HD Images – mix of Unsplash, Pexels, Pixabay; checked to be real
const productImageSets = [
  [
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80', // Home
    'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=800&q=80', // Fashion
    'https://cdn.pixabay.com/photo/2016/11/19/14/00/soap-bubble-1836121_1280.jpg'
  ],
  [
    'https://images.pexels.com/photos/1459393/pexels-photo-1459393.jpeg?w=800&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&q=80',
    'https://cdn.pixabay.com/photo/2015/01/08/18/26/office-593317_1280.jpg'
  ],
  [
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&q=80',
    'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?w=800&q=80',
    'https://cdn.pixabay.com/photo/2017/03/27/13/36/keyboard-2171423_1280.jpg'
  ],
  [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    'https://images.pexels.com/photos/2531233/pexels-photo-2531233.jpeg?w=800&q=80',
    'https://cdn.pixabay.com/photo/2016/02/19/11/53/board-1209820_1280.jpg'
  ]
];

// Generates a random product title (simple, for demo)
function getRandomTitle(category) {
  const titles = {
    Fashion: ['Stylish Jacket', 'Trendy Jeans', 'Casual T-Shirt'],
    Electronics: ['Smartphone Pro', 'Bluetooth Headphones', 'Wireless Mouse'],
    Books: ['Mystery Novel', 'History Book', 'Science Magazine'],
    "Home & Kitchen": ['Blender Mixer', 'Non-Stick Pan', 'Cotton Bedsheet'],
    Toys: ['Lego Set', 'Toy Car', 'Puzzle Game'],
    Sports: ['Tennis Racquet', 'Yoga Mat', 'Football'],
    Beauty: ['Face Cleanser', 'Lipstick Set', 'Perfume'],
    Automotive: ['Car Vacuum', 'Phone Holder', 'Tool Kit'],
    Grocery: ['Organic Honey', 'Herbal Tea', 'Granola Bar']
  };
  const arr = titles[category] || ['Product'];
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seedProducts() {
  await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

  // Will create 120 products, 30 per seller, random category and images
  const products = [];
  for (let sellerIdx = 0; sellerIdx < sellerIds.length; sellerIdx++) {
    for (let i = 0; i < 30; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const imageSet = productImageSets[Math.floor(Math.random() * productImageSets.length)];
      const price = Math.floor(Math.random() * 10000 + 500); // 500 - 10,500
      const stock = Math.floor(Math.random() * 100 + 10); // 10 - 110

      products.push({
        sellerId: sellerIds[sellerIdx],
        title: getRandomTitle(category),
        description: `High quality ${category} product. Perfect for your needs.`,
        category: [category],
        price,
        discount: Math.random() < 0.5 ? Math.floor(Math.random() * 30) : 0, // Up to 30% discount
        stock,
        images: imageSet,
        isPublished: true,
        isFeatured: Math.random() < 0.15 // 15% chance to be featured
      });
    }
  }

  await Product.deleteMany(); // remove this line if you want to append, not overwrite
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products!`);
  process.exit();
}

seedProducts().catch(e => {
  console.error(e);
  process.exit(1);
});
