# E-Commerce Platform

A full-featured e-commerce platform built with Node.js, Express, and MongoDB, featuring user authentication, product management, and order processing.

## Features

- 🔐 User Authentication
  - Sign up and login functionality
  - Password hashing and JWT-based authentication
  - Password change capability
  - Secure logout mechanism

- 🛍️ Product Management
  - Product listing and details
  - Product search functionality
  - Product categories
  - Product images handling

- 🛒 Shopping Cart
  - Add/remove items
  - Update quantities
  - Cart persistence

- 📦 Order Management
  - Order creation and tracking
  - Order history
  - Order status updates

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local storage for images
- **API**: RESTful API architecture

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
secret_key=your_jwt_secret_key
```

4. Start the server:
```bash
npm start
```

## Project Structure

```
Ecommerce/
├── Authentication/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── utils/
├── Product/
│   ├── controllers/
│   ├── middleware/
│   └── models/
├── Cart/
│   ├── controllers/
│   └── models/
├── Order/
│   ├── controllers/
│   └── models/
└── uploads/
    └── product_images/
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- PUT `/api/auth/change-password` - Change user password

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product details
- POST `/api/products` - Create new product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

### Cart
- GET `/api/cart` - Get user's cart
- POST `/api/cart` - Add item to cart
- PUT `/api/cart/:id` - Update cart item
- DELETE `/api/cart/:id` - Remove item from cart

### Orders
- GET `/api/orders` - Get user's orders
- POST `/api/orders` - Create new order
- GET `/api/orders/:id` - Get order details

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using middleware
- Input validation and sanitization
- Secure file upload handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or create an issue in the repository. 