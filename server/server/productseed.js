// scripts/seedProducts.js
import mongoose from "mongoose";
import { Product } from "./src/models/products.model.js";


const SELLER_ID = "6878b402fc04a8ee90d040a9";

const categories = [
  'Fashion','Electronics','Books','Home & Kitchen',
  'Toys','Sports','Beauty','Automotive','Grocery'
];

// 18 unique Unsplash images (cycle them for demonstration; each group of 3 forms a set)
const allImages = [
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
];

// Utility to get 3 images as a set, cycling if > 18 needed
function getImagesSet(idx) {
  const base = (idx * 3) % (allImages.length - 2);
  return [allImages[base], allImages[base + 1], allImages[base + 2]];
}

function getRandomCategory() {
  // 1 category, randomly picked
  return [ categories[Math.floor(Math.random() * categories.length)] ];
}
function randomPrice(min=10, max=500) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomStock() {
  return Math.floor(Math.random() * 100) + 1;
}
function randomDiscount() {
  return Math.floor(Math.random() * 30); // Up to 30%
}

const products = Array.from({ length: 50 }).map((_, i) => ({
  sellerId:new mongoose.Types.ObjectId(SELLER_ID),
  title: `Sample Product ${i+1}`,
  description: `Awesome product number ${i+1} to round out your catalog. High quality and trending!`,
  category: getRandomCategory(),
  price: randomPrice(),
  discount: randomDiscount(),
  stock: randomStock(),
  images: getImagesSet(i),
  ratings: { average: 0, count: 0 },
  isPublished: true
}));

async function seed() {
  await mongoose.connect("mongodb://localhost:27017/ecommerce"); // Change to your database
  // await Product.deleteMany({}); // Uncomment if you want to clear all products first
  const result = await Product.insertMany(products);
  console.log(`Seeded ${result.length} products`);
  mongoose.disconnect();
}
seed();
