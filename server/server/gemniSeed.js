import mongoose from "mongoose";
import { Product } from "./src/models/products.model.js"; 
import { Seller } from "./src/models/seller.model.js"; 
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected for seeding.");

    const sellerId = "6878b402fc04a8ee90d040a9"; 
    const existingSeller = await Seller.findById(sellerId);
    if (!existingSeller) {
      console.error(
        "Seller with the provided ID does not exist. Please ensure the seller ID is correct."
      );
      process.exit(1);
    }

   
    await Product.deleteMany({ sellerId: sellerId });
    existingSeller.currentSellingProducts = [];
    await existingSeller.save();
    console.log(`Cleared existing products for seller ${sellerId}`);

    const productsToSeed = [
      // Fashion Category
      {
        title: "Classic Men's Leather Wallet",
        description: "Premium genuine leather wallet with multiple card slots and a spacious bill compartment.",
        category: ["Fashion"],
        price: 35.00,
        discount: 5,
        stock: 75,
        images: [
          "https://picsum.photos/id/1/1200/800",
          "https://picsum.photos/id/2/1200/800",
          "https://picsum.photos/id/3/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },
      {
        title: "Elegant Women's Silk Scarf",
        description: "Luxurious silk scarf with vibrant floral patterns, perfect for any occasion.",
        category: ["Fashion"],
        price: 28.50,
        stock: 60,
        images: [
          "https://picsum.photos/id/4/1200/800",
          "https://picsum.photos/id/5/1200/800",
          "https://picsum.photos/id/6/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },
      {
        title: "Unisex Sports Sneakers",
        description: "Lightweight and breathable sneakers designed for comfort and performance during sports activities.",
        category: ["Fashion", "Sports"],
        price: 79.99,
        discount: 10,
        stock: 90,
        images: [
          "https://picsum.photos/id/7/1200/800",
          "https://picsum.photos/id/8/1200/800",
          "https://picsum.photos/id/9/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },

      // Electronics Category
      {
        title: "Smart LED Television 55-inch",
        description: "Immersive 4K UHD viewing experience with built-in smart features and voice control.",
        category: ["Electronics"],
        price: 599.00,
        discount: 50,
        stock: 20,
        images: [
          "https://picsum.photos/id/10/1200/800",
          "https://picsum.photos/id/11/1200/800",
          "https://picsum.photos/id/12/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },
      {
        title: "Portable Bluetooth Speaker",
        description: "Compact and powerful speaker with rich bass and crystal-clear audio, perfect for outdoor adventures.",
        category: ["Electronics"],
        price: 45.00,
        stock: 120,
        images: [
          "https://picsum.photos/id/13/1200/800",
          "https://picsum.photos/id/14/1200/800",
          "https://picsum.photos/id/15/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },

      // Books Category
      {
        title: "The Art of Programming (Technical)",
        description: "A comprehensive guide to modern programming principles and best practices.",
        category: ["Books"],
        price: 40.00,
        stock: 80,
        images: [
          "https://picsum.photos/id/16/1200/800",
          "https://picsum.photos/id/17/1200/800",
          "https://picsum.photos/id/18/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },

      // Home & Kitchen Category
      {
        title: "Stainless Steel Coffee Maker",
        description: "Elegant and durable coffee maker with a 12-cup capacity and programmable timer.",
        category: ["Home & Kitchen"],
        price: 65.00,
        discount: 8,
        stock: 40,
        images: [
          "https://picsum.photos/id/19/1200/800",
          "https://picsum.photos/id/20/1200/800",
          "https://picsum.photos/id/21/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },
      {
        title: "Memory Foam Pillow (Orthopedic)",
        description: "Ergonomic memory foam pillow providing superior neck and head support for a restful sleep.",
        category: ["Home & Kitchen"],
        price: 30.00,
        stock: 55,
        images: [
          "https://picsum.photos/id/22/1200/800",
          "https://picsum.photos/id/23/1200/800",
          "https://picsum.photos/id/24/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },

      // Toys Category
      {
        title: "Educational Building Blocks Set",
        description: "Colorful and durable building blocks for imaginative play and cognitive development in children.",
        category: ["Toys"],
        price: 25.00,
        stock: 100,
        images: [
          "https://picsum.photos/id/25/1200/800",
          "https://picsum.photos/id/26/1200/800",
          "https://picsum.photos/id/27/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },

      // Sports Category
      {
        title: "Professional Yoga Mat",
        description: "Non-slip, extra-thick yoga mat for comfortable and stable workouts. Easy to clean and carry.",
        category: ["Sports"],
        price: 20.00,
        stock: 70,
        images: [
          "https://picsum.photos/id/28/1200/800",
          "https://picsum.photos/id/29/1200/800",
          "https://picsum.photos/id/30/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },

      // Beauty Category
      {
        title: "Natural Anti-Aging Serum",
        description: "Rich in antioxidants, this serum reduces wrinkles and promotes youthful, radiant skin.",
        category: ["Beauty"],
        price: 55.00,
        discount: 10,
        stock: 45,
        images: [
          "https://picsum.photos/id/31/1200/800",
          "https://picsum.photos/id/32/1200/800",
          "https://picsum.photos/id/33/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },

      // Automotive Category
      {
        title: "Car Dash Cam with Night Vision",
        description: "Full HD dash camera with wide-angle lens and enhanced night vision for clear recordings.",
        category: ["Automotive"],
        price: 95.00,
        stock: 30,
        images: [
          "https://picsum.photos/id/34/1200/800",
          "https://picsum.photos/id/35/1200/800",
          "https://picsum.photos/id/36/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },

      // Grocery Category
      {
        title: "Premium Organic Coffee Beans (1kg)",
        description: "Freshly roasted 100% Arabica beans, offering a rich aroma and smooth, balanced flavor.",
        category: ["Grocery"],
        price: 22.00,
        stock: 85,
        images: [
          "https://picsum.photos/id/37/1200/800",
          "https://picsum.photos/id/38/1200/800",
          "https://picsum.photos/id/39/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },
      {
        title: "Assorted Gourmet Chocolate Box",
        description: "A delightful selection of handcrafted chocolates with various fillings and flavors.",
        category: ["Grocery"],
        price: 18.00,
        stock: 60,
        images: [
          "https://picsum.photos/id/40/1200/800",
          "https://picsum.photos/id/41/1200/800",
          "https://picsum.photos/id/42/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },
      {
        title: "Extra Virgin Olive Oil (500ml)",
        description: "Cold-pressed extra virgin olive oil from the finest olives, perfect for cooking and dressings.",
        category: ["Grocery", "Home & Kitchen"],
        price: 12.50,
        stock: 70,
        images: [
          "https://picsum.photos/id/43/1200/800",
          "https://picsum.photos/id/44/1200/800",
          "https://picsum.photos/id/45/1200/800",
        ],
        isPublished: true,
        isFeatured: true,
      },
    ];

    const createdProducts = [];
    for (const productData of productsToSeed) {
      const newProduct = await Product.create({
        ...productData,
        sellerId: sellerId,
      });
      createdProducts.push(newProduct);
      existingSeller.currentSellingProducts.push(newProduct._id);
    }

    await existingSeller.save();

    console.log("--- Products seeded successfully! ---");
    createdProducts.forEach((product) => {
      console.log(`Product: ${product.title} (ID: ${product._id})`);
      console.log(`Images: ${product.images.join(", ")}`);
    });
    console.log(
      `Updated seller ${existingSeller.username.firstName} with ${createdProducts.length} new products.`
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedDatabase();