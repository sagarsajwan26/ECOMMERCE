import mongoose from "mongoose";
import { Product } from "./src/models/products.model.js";
import { Seller } from "./src/models/seller.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const sellerId = "6878b402fc04a8ee90d040a9"; // your existing seller

const categoriesList = [
  "Fashion", "Electronics", "Books", "Home & Kitchen", "Toys",
  "Sports", "Beauty", "Automotive", "Grocery"
];

// Example HD images for each category (minimum 3 per product!)
const imagesByCategory = {
  Fashion: [
    [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
      "https://images.unsplash.com/photo-1469398715555-76331d6c166a?w=800&q=80",
      "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?w=800&q=80"
    ],
    [
      "https://images.unsplash.com/photo-1475189778702-5ec9941484a8?w=800&q=80",
      "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?w=800&q=80",
      "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?w=800&q=80"
    ]
  ],
  Electronics: [
    [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80",
      "https://images.pexels.com/photos/163136/usb-cable-computer-technology-server-163136.jpeg?w=800&q=80"
    ],
    [
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      "https://cdn.pixabay.com/photo/2015/01/08/18/26/office-593317_1280.jpg"
    ]
  ],
  Books: [
    [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
      "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?w=800&q=80",
      "https://cdn.pixabay.com/photo/2016/11/23/18/32/book-1859364_1280.jpg"
    ]
  ],
  "Home & Kitchen": [
    [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?w=800&q=80",
      "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?w=800&q=80",
      "https://cdn.pixabay.com/photo/2015/06/24/15/45/kitchen-820934_1280.jpg"
    ]
  ],
  Toys: [
    [
      "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?w=800&q=80",
      "https://cdn.pixabay.com/photo/2015/09/18/19/03/lego-942969_1280.jpg",
      "https://images.unsplash.com/photo-1465101178521-c1a9136a0b86?w=800&q=80"
    ]
  ],
  Sports: [
    [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/ball-1867079_1280.jpg",
      "https://images.pexels.com/photos/2294402/pexels-photo-2294402.jpeg?w=800&q=80"
    ]
  ],
  Beauty: [
    [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=800&q=80",
      "https://cdn.pixabay.com/photo/2017/01/20/15/06/smile-1994526_1280.jpg"
    ]
  ],
  Automotive: [
    [
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?w=800&q=80",
      "https://cdn.pixabay.com/photo/2016/11/18/19/15/auto-1838782_1280.jpg",
      "https://images.unsplash.com/photo-1465146344425-f00d5f8b7883?w=800&q=80"
    ]
  ],
  Grocery: [
    [
      "https://cdn.pixabay.com/photo/2015/05/31/14/20/groceries-792113_1280.jpg",
      "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?w=800&q=80",
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=800&q=80"
    ]
  ]
};

// Helper to pick random images for many products
function pickImages(category) {
  const sets = imagesByCategory[category] || Object.values(imagesByCategory)[0];
  return sets[Math.floor(Math.random() * sets.length)];
}

// Generates a random product title for demo
function generateTitle(category, idx) {
  return `${category} Product ${idx + 1}`;
}

function generateDescription(category) {
  return `A wonderful ${category.toLowerCase()} item with exceptional quality and style.`;
}

async function seedExtraProducts(numberToAdd = 110) {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, useUnifiedTopology: true
    });
    console.log("MongoDB connected for additional product seeding.");

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      console.error("Seller not found!");
      process.exit(1);
    }

    const newProducts = [];
    for (let i = 0; i < numberToAdd; i++) {
      // Distribute evenly through all categories
      const category = categoriesList[i % categoriesList.length];
      const images = pickImages(category);
      const price = parseFloat((Math.random() * 100 + 10).toFixed(2)); // 10 - 110
      const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 25) : 0;
      const stock = Math.floor(Math.random() * 150 + 10);
      const isFeatured = Math.random() > 0.85;

      const productData = {
        sellerId,
        title: generateTitle(category, i),
        description: generateDescription(category),
        category: [category],
        price,
        discount,
        stock,
        images,
        isPublished: true,
        isFeatured
      };
      const product = await Product.create(productData);
      seller.currentSellingProducts.push(product._id);
      newProducts.push(product);
    }
    await seller.save();
    
    console.log(`Seeded ${newProducts.length} additional products!`);
    newProducts.slice(0, 5).forEach(p => {
      console.log(`${p.title} | ${p.category[0]} | Images: ${p.images.join(", ")}`);
    });
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
}

seedExtraProducts(115); // number of new products to add
