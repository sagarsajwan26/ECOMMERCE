import mongoose from "mongoose";
import { Seller } from "./src/models/seller.model.js";
import { Product } from "./src/models/products.model.js";

const MONGO_URI = "mongodb://localhost:27017/ecommerce";


const fashionImages = [
  "https://images.unsplash.com/photo-1513708927688-890fe1a2fa5a",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
];

const sellersData = [
  {
    username: { firstName: "Alice", lastName: "Stylish" },
    email: "alice@example.com",
    password: "password123",
    storeName: "Alice's Trends",
    contactNumber: 1234567890,
    address: "123 Fashion Ave",
    productCategories: ["Fashion", "Electronics", "Books"],
    isEmailVerified: true,
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    username: { firstName: "Bob", lastName: "Gearhead" },
    email: "bob@example.com",
    password: "password123",
    storeName: "Bob's Gadgets",
    contactNumber: 9876543210,
    address: "456 Tech Blvd",
    productCategories: ["Automotive", "Sports", "Grocery"],
    isEmailVerified: true,
    profilePic: "https://randomuser.me/api/portraits/men/33.jpg"
  }
];


async function runSeed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("[DB] Connected");

 
  await Seller.deleteMany({});
  await Product.deleteMany({});

  
  const sellerDocs = await Seller.insertMany(sellersData); 
  const products = [
    
    {
      sellerId: sellerDocs[0]._id,
      title: "Trendy Denim Jacket",
      description: "High-quality denim, stylish, unisex fit.",
      category: ["Fashion"],
      price: 1699,
      discount: 120,
      stock: 25,
      images: fashionImages,
      isPublished: true,
    },
    {
      sellerId: sellerDocs[0]._id,
      title: "Wireless Headphones",
      description: "Premium sound, noise cancelling, long battery life.",
      category: ["Electronics"],
      price: 3999,
      discount: 300,
      stock: 42,
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        "https://images.unsplash.com/photo-1517430816045-df4b7de11d1b",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
      ],
      isPublished: true,
    },
    {
      sellerId: sellerDocs[0]._id,
      title: "The Great Gatsby - Hardcover",
      description: "Classic novel in hardcover, beautifully bound.",
      category: ["Books"],
      price: 499,
      stock: 17,
      images: [
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
        "https://images.unsplash.com/photo-1463320898484-cdee8141c787"
      ],
      isPublished: true,
    },
    {
      sellerId: sellerDocs[0]._id,
      title: "Modern Ceramic Vase",
      description: "Unique centerpiece for home or office decor.",
      category: ["Home & Kitchen"],
      price: 1299,
      discount: 100,
      stock: 34,
      images: [
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd"
      ],
      isPublished: false,
    },
    {
      sellerId: sellerDocs[0]._id,
      title: "Building Blocks Set",
      description: "Creative, educational toy for kids of all ages.",
      category: ["Toys"],
      price: 699,
      stock: 48,
      images: [
        "https://images.unsplash.com/photo-1511918984145-48de785d4c4e",
        "https://images.unsplash.com/photo-1532274402917-5aadf881bdfb",
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99"
      ],
      isPublished: true,
    },
    // 5 for seller 2
    {
      sellerId: sellerDocs[1]._id,
      title: "Pro Badminton Racket",
      description: "Lightweight carbon fiber, tournament ready.",
      category: ["Sports"],
      price: 1899,
      stock: 12,
      images: [
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        "https://images.unsplash.com/photo-1517649763962-0c623066013b",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
      ],
      isPublished: true,
    },
    {
      sellerId: sellerDocs[1]._id,
      title: "Matte Lipstick Set",
      description: "Long-lasting, beautiful matte shades for all skin types.",
      category: ["Beauty"],
      price: 999,
      stock: 20,
      images: [
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
        "https://images.unsplash.com/photo-1487412912498-0447578fcca8",
        "https://images.unsplash.com/photo-1503602642458-232111445657"
      ],
      isPublished: false,
    },
    {
      sellerId: sellerDocs[1]._id,
      title: "Universal Car Phone Holder",
      description: "360-degree rotation, fits all smartphones.",
      category: ["Automotive"],
      price: 599,
      stock: 60,
      images: [
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
        "https://images.unsplash.com/photo-1511918984145-48de785d4c4e",
        "https://images.unsplash.com/photo-1503736311115-275537ef203a"
      ],
      isPublished: true,
    },
    {
      sellerId: sellerDocs[1]._id,
      title: "Organic Almonds - 500g",
      description: "Healthy, organic almonds packed in a seal-tight bag.",
      category: ["Grocery"],
      price: 499,
      stock: 75,
      images: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad04"
      ],
      isPublished: true,
    },
    {
      sellerId: sellerDocs[1]._id,
      title: "Men's Grey Hoodie",
      description: "Comfortable fleece, versatile casual wear.",
      category: ["Fashion"],
      price: 1499,
      stock: 22,
      images: [
        "https://images.unsplash.com/photo-1513708927688-890fe1a2fa5a",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
      ],
      isPublished: true,
    }
  ];

  // 3. INSERT PRODUCTS
  const productDocs = await Product.insertMany(products);

  // 4. UPDATE SELLERS WITH THEIR PRODUCTS' IDS
  const seller1ProductIds = productDocs.filter(p => p.sellerId.equals(sellerDocs[0]._id)).map(p => p._id);
  const seller2ProductIds = productDocs.filter(p => p.sellerId.equals(sellerDocs[1]._id)).map(p => p._id);

  await Seller.findByIdAndUpdate(sellerDocs[0]._id, { currentSellingProducts: seller1ProductIds });
  await Seller.findByIdAndUpdate(sellerDocs[1]._id, { currentSellingProducts: seller2ProductIds });

  console.log("[✔] Seed complete!");
  mongoose.disconnect();
}

runSeed().catch(e => { console.error(e); process.exit(1); });
