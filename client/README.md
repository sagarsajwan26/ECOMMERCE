# 🛒 ECOMMERCE PLATFORM - FULLSTACK PROJECT

A complete MERN stack e-commerce platform supporting **users**, **sellers**, and **admins**.  
This README will help you (and future contributors) understand the code flow, folder structure, and how to extend or debug the project.

---

## 📁 Folder Structure

```
ECOMMERCE/
│
├── client/         # React frontend (Vite)
│   ├── src/
│   │   ├── component/   # Reusable UI components
│   │   ├── pages/       # Page-level components (User, Seller, Admin, Home)
│   │   ├── store/       # Redux slices and thunks
│   │   ├── utils/       # Axios instance, helpers
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── public/          # Static assets
│   └── package.json
│
├── server/         # Node.js backend (Express, MongoDB)
│   ├── src/
│   │   ├── controllers/ # Route handlers (user, seller, admin, product, review)
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # Express routers
│   │   ├── middleware/  # Auth, multer, nodemailer, etc.
│   │   ├── utils/       # Helper functions (cloudinary, ApiResponse, etc.)
│   │   ├── db/          # MongoDB connection
│   │   └── app.js       # Express app setup
│   ├── server.js        # Entry point
│   ├── vercel.json      # Vercel deployment config
│   └── package.json
│
└── README.md       # This file
```

---

## 🚀 How the Code Flows

### 1. **Frontend (client/)**
- **Pages**: Each role (User, Seller, Admin) has its own pages (login, dashboard, account, etc.).
- **Components**: Reusable UI blocks (Navbar, Cart, ProductDetail, SellerDashboard, etc.).
- **Redux Store**: State management for users, sellers, products, reviews.
- **API Calls**: Use `axiosInstance` from `src/utils/axios.js` for all backend requests.
- **Routing**: Uses `react-router-dom` for navigation.

### 2. **Backend (server/)**
- **Entry Point**: `server.js` connects to MongoDB and starts the Express app from `src/app.js`.
- **App Setup**: `src/app.js` configures middleware (CORS, body parser, cookie parser), static files, and routes.
- **Controllers**: Each controller handles business logic for its domain (user, seller, admin, product, review).
- **Models**: Mongoose schemas for all entities (User, Seller, Product, Review, Cart, Order, etc.).
- **Routes**: Each router maps HTTP endpoints to controller functions.
- **Middleware**: Handles authentication, file uploads (multer), email (nodemailer), etc.
- **Utils**: Helper functions for responses, cloudinary uploads, etc.

---

## 🧑‍💻 Main Features

- **User**: Signup, login, cart, wishlist, profile, reviews, password reset, email verification.
- **Seller**: Signup, login, add/update/delete products, view orders, profile, email verification.
- **Admin**: Signup, login, dashboard.
- **Product**: List, search, filter, review, suggest products.
- **Review**: Add, edit, delete reviews.
- **Order**: Place, view, manage orders.
- **File Uploads**: Product images, profile pictures via Cloudinary.
- **Email**: Verification and password reset via Nodemailer (supports OAuth2).
- **Authentication**: JWT-based, cookies for session management.

---

## 🛠️ How to Extend or Debug

### **Frontend**
- To add a new page: Create a component in `src/pages/` and add a route in `App.jsx`.
- To add a new API call: Add a thunk in `src/store/[role]/[role]Thunk.js` and handle it in the slice.
- To update UI: Edit components in `src/component/`.

### **Backend**
- To add a new endpoint:  
  1. Add a function in the relevant controller in `src/controllers/`.
  2. Map it in the router in `src/routes/`.
- To add a new model: Create a schema in `src/models/`.
- To add middleware: Create in `src/middleware/` and use in `app.js` or router.
- To debug: Use `console.log` or a debugger in controllers/middleware.

---

## 🔒 Authentication & Cookies

- **Login**: On successful login, a JWT token is set in a cookie (`userToken`, `sellerToken`, `adminToken`).
- **Logout**: The cookie is cleared (`maxAge: 0`) and Redux state is reset.
- **Protected Routes**: Use auth middleware to check JWT and user role.

---

## 📨 Email Setup

- Uses Nodemailer for sending emails.
- For OAuth2, set these env variables:
  - `EMAIL_USER`, `EMAIL_CLIENT_ID`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN`
- For password: use `EMAIL_USER`, `EMAIL_PASS`

---

## ☁️ File Uploads

- Uses Multer for handling uploads.
- Images are uploaded to Cloudinary via `uploadToCloudinary` util.

---

## ⚡ Deployment

- **Vercel**: Uses `vercel.json` for serverless deployment.
- **Environment Variables**: Set secrets in Vercel dashboard or `.env` files.

---

## 📝 Common Patterns

- **AsyncHandler**: Wraps async controller functions for error handling.
- **ApiResponse**: Standardizes API responses.
- **Redux Thunks**: All API calls are handled via thunks for async state updates.

---

## 🆘 Troubleshooting

- **CORS errors**: Check `cors` config in `app.js` and ensure frontend URL matches.
- **Cookie not removed**: Ensure `path`, `domain`, `secure`, and `sameSite` match when setting and removing cookies.
- **PayloadTooLargeError**: Increase body parser limits in `app.js`:
  ```js
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))
  ```

---

## 📚 Useful Tips

- Always use `react-router-dom` for navigation in React.
- Use Redux slices for state management and keep API logic in thunks.
- When editing backend, keep controller logic clean and reusable.
- For new features, follow existing patterns for controllers, routes, and models.

---

## 🧩 How to Add a New Feature

1. **Frontend**:  
   - Create a new component/page.
   - Add Redux state/thunk if needed.
   - Add route in `App.jsx`.

2. **Backend**:  
   - Add controller function.
   - Map in router.
   - Update model if needed.

3. **Test**:  
   - Use Postman or frontend to test new endpoint.

---

## 📝 Contributing

- Fork the repo, create a feature branch, commit changes, and open a PR.
- Follow code style and patterns used in the project.

---

## 📄 License

MIT

---

**For any questions or improvements, open an issue or contact the maintainer. Happy coding! 🚀**