# 🛒 E-Commerce REST API

A full-featured Node.js + Express + MongoDB REST API for an e-commerce platform.  
Supports **user**, **seller**, and **admin** roles, authentication, product management, cart, wishlist, reviews, and more.

---

## 🚀 Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api/server
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Environment Variables**
Create a `.env` file in the `server` directory. Example:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```
> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833?hl=en).

### 4. **Start the Server**
```bash
npm run dev
```
Server runs on `http://localhost:5000`

---

## 📚 API Structure

- **/api/v1/user** – User registration, login, cart, wishlist, reviews, etc.
- **/api/v1/seller** – Seller registration, login, product management, etc.
- **/api/v1/admin** – Admin registration, login.

---

## 🧑‍💻 Main Features

### Authentication
- JWT-based for all roles (user, seller, admin)
- Email verification for users and sellers
- Password hashing with bcrypt

### User
- Register, login, logout
- Email verification
- Cart: add, remove, update products
- Wishlist: add, remove products
- Product reviews: add, edit, delete
- Password reset via email

### Seller
- Register, login, logout
- Email verification
- Add, update, delete products
- View own products

### Admin
- Register, login, logout

### Product
- List all products (with pagination)
- Get product reviews

### Review
- Add, edit, delete reviews (users only)

---

## 🛠️ Endpoints Overview

### User

| Method | Endpoint                              | Description                       | Auth Required |
|--------|---------------------------------------|-----------------------------------|--------------|
| POST   | `/api/v1/user/signup`                 | Register new user                 | No           |
| POST   | `/api/v1/user/login`                  | Login user                        | No           |
| POST   | `/api/v1/user/logout`                 | Logout user                       | Yes          |
| GET    | `/api/v1/user/verify-email/:id`       | Verify user email                 | No           |
| POST   | `/api/v1/user/addToCart/:id`          | Add product to cart               | Yes          |
| PUT    | `/api/v1/user/removeFromCart/:id`     | Remove or decrement product in cart| Yes         |
| POST   | `/api/v1/user/resetPassword`          | Send reset password link          | No           |
| POST   | `/api/v1/user/addReview`              | Add product review                | Yes          |
| DELETE | `/api/v1/user/deleteReview/:id`       | Delete review                     | Yes          |
| PUT    | `/api/v1/user/updateReview/:id`       | Edit review                       | Yes          |
| POST   | `/api/v1/user/wishlist/:id`           | Add product to wishlist           | Yes          |
| DELETE | `/api/v1/user/wishlist/:id`           | Remove product from wishlist      | Yes          |

### Seller

| Method | Endpoint                                  | Description                       | Auth Required |
|--------|-------------------------------------------|-----------------------------------|--------------|
| POST   | `/api/v1/seller/signup`                   | Register new seller               | No           |
| POST   | `/api/v1/seller/login`                    | Login seller                      | No           |
| POST   | `/api/v1/seller/logout`                   | Logout seller                     | Yes          |
| GET    | `/api/v1/seller/verify-email/:verifyToken`| Verify seller email               | No           |
| GET    | `/api/v1/seller/getProfile`               | Get seller profile                | Yes          |
| POST   | `/api/v1/seller/add-product`              | Add new product                   | Yes          |
| GET    | `/api/v1/seller/getProductList`           | Get all seller's products         | Yes          |
| PUT    | `/api/v1/seller/update-product/:id`       | Update product                    | Yes          |
| DELETE | `/api/v1/seller/delete-product/:id`       | Delete product                    | Yes          |

### Admin

| Method | Endpoint                  | Description         | Auth Required |
|--------|---------------------------|---------------------|--------------|
| POST   | `/api/v1/admin/signup`    | Register admin      | No           |
| POST   | `/api/v1/admin/login`     | Login admin         | No           |
| POST   | `/api/v1/admin/logout`    | Logout admin        | Yes          |

### Product

| Method | Endpoint                        | Description             | Auth Required |
|--------|---------------------------------|-------------------------|--------------|
| GET    | `/api/v1/user/getProductReview` | Get product reviews     | No           |
| GET    | `/api/v1/seller/getProductList` | Get seller's products   | Yes          |

---

## 📝 Request & Response Examples

### User Signup

**POST** `/api/v1/user/signup`
```json
{
  "username": { "firstName": "John", "lastName": "Doe" },
  "email": "john@example.com",
  "password": "yourpassword",
  "contactNumber": 1234567890,
  "address": "123 Main St"
}
```

### Seller Signup

**POST** `/api/v1/seller/signup`
```json
{
  "username": { "firstName": "Jane", "lastName": "Smith" },
  "email": "jane@example.com",
  "password": "yourpassword",
  "storeName": "Jane's Store",
  "contactNumber": 9876543210,
  "address": "456 Market St",
  "productCategories": ["Fashion", "Electronics"]
}
```

---

## 🔒 Authentication

- Use JWT tokens for all protected routes.
- Tokens are sent via cookies (`userToken`, `sellerToken`, `adminToken`) or `Authorization: Bearer <token>` header.

---

## 📦 File Uploads

- Sellers can upload product images using `multipart/form-data` (handled by Multer and Cloudinary).

---

## 📧 Email

- Uses Gmail SMTP via Nodemailer for verification and password reset.
- Make sure to use an App Password for Gmail.

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 🆘 Need Help?

- **Issues:** [Open an issue](https://github.com/your-username/ecommerce-api/issues)
- **Contact:** [your-email@example.com](mailto:your-email@example.com)

---

## 📄 License

MIT

---

**Happy Coding! 🚀**