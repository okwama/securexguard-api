<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# eGuard API

A comprehensive NestJS API for the eGuard Security Management System.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Journey Plan Management**: Create, manage, and track security patrols
- **QR Code Integration**: Scan QR codes for premises check-ins
- **Real-time Location Tracking**: GPS-based location services
- **SOS Emergency System**: Emergency alert and response management
- **Leave Management**: Employee leave request and approval system
- **Reporting System**: Comprehensive incident and activity reporting
- **Visitor Management**: Visitor registration and approval system
- **Order Management**: Product ordering system for residents
- **Swagger Documentation**: Auto-generated API documentation

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd server/eguard-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_NAME=citlogis_securex

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=5h

   # Application Configuration
   NODE_ENV=development
   PORT=5000
   ```

4. **Database Setup**
   - Import the `citlogis_securex.sql` file into your MySQL database
   - Ensure the database connection details match your `.env` file

## 🚀 Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## 📚 API Documentation

Once the application is running, you can access the Swagger documentation at:
```
http://localhost:5000/api/docs
```

## 🏗️ Project Structure

```
src/
├── config/                 # Configuration files
│   ├── database.config.ts  # Database configuration
│   └── jwt.config.ts       # JWT configuration
├── common/                 # Shared components
│   ├── dto/               # Data Transfer Objects
│   ├── guards/            # Authentication guards
│   └── decorators/        # Custom decorators
├── entities/              # TypeORM entities
│   ├── user.entity.ts
│   ├── premises.entity.ts
│   ├── journey-plan.entity.ts
│   └── ...
├── modules/               # Feature modules
│   ├── auth/             # Authentication module
│   ├── journey-plans/    # Journey plan management
│   ├── premises/         # Premises management
│   ├── sos/              # SOS emergency system
│   ├── leave/            # Leave management
│   ├── reports/          # Reporting system
│   ├── orders/           # Order management
│   └── visitors/         # Visitor management
└── main.ts               # Application entry point
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Available Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/login-resident` - Resident-specific login
- `GET /api/auth/profile` - Get user profile

#### Journey Plans
- `POST /api/journey-plans` - Create journey plan
- `GET /api/journey-plans` - Get user journey plans
- `GET /api/journey-plans/all` - Get all journey plans (admin)
- `POST /api/journey-plans/validate-qr` - Validate QR code
- `POST /api/journey-plans/:id/check-in` - Check in to journey plan
- `POST /api/journey-plans/:id/check-out` - Check out from journey plan

## �� Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Available Scripts

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔧 Configuration

### Database
The application uses TypeORM with MySQL. Configure your database connection in the `.env` file.

### JWT
JWT tokens are used for authentication. Configure the secret and expiration time in the `.env` file.

### CORS
CORS is configured to allow requests from Flutter apps and web clients. Update the origins in `main.ts` if needed.

## 🚀 Deployment

### Vercel
The API is configured for deployment on Vercel. The build process and environment variables are already set up.

### Docker
```bash
# Build the image
docker build -t eguard-api .

# Run the container
docker run -p 5000:5000 eguard-api
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support
## Author - Benjamin Okwama
For support and questions, please contact the development team.
