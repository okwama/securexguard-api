# eGuard API - Vercel Deployment Guide

## 🚀 Quick Deploy

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from the API directory
```bash
cd server/eguard-api
vercel
```

## 📋 Prerequisites

### Environment Variables Setup
Set these environment variables in your Vercel dashboard:

#### Database Configuration
```
DB_HOST=102.218.215.35
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your-database-password
DB_NAME=citlogis_securex
```

#### JWT Configuration
```
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=5h
```

#### Server Configuration
```
PORT=5000
NODE_ENV=production
```

#### CORS Configuration
```
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

#### Cloudinary (Optional - for file uploads)
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🔧 Configuration Files

### vercel.json
- Routes all requests to `src/main.ts`
- Sets max function duration to 30 seconds
- Configures production environment

### Environment Variables
- Copy from `env.example` to Vercel dashboard
- Update with your actual values
- Ensure database credentials are correct

## 📱 Flutter App Updates

After deployment, update your Flutter apps with the new API URL:

### For Guards App
```dart
// In guards/lib/utils/auth_config.dart
class ApiConfig {
  static const String baseUrl = 'https://your-vercel-app.vercel.app';
}
```

### For Securex App
```dart
// In securex/lib/utils/auth_config.dart
class ApiConfig {
  static const String baseUrl = 'https://your-vercel-app.vercel.app';
}
```

## 🔍 Testing Deployment

### 1. Health Check
```bash
curl https://your-vercel-app.vercel.app/api
```

### 2. API Documentation
Visit: `https://your-vercel-app.vercel.app/api/docs`

### 3. Test Authentication
```bash
curl -X POST https://your-vercel-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"0706166875","password":"password123"}'
```

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check if your MySQL server allows external connections
   - Verify database credentials in environment variables
   - Ensure database exists and tables are created

2. **CORS Errors**
   - Update CORS_ORIGIN with your Flutter app's domain
   - Add your app's domain to the CORS origins list in main.ts

3. **Function Timeout**
   - Increase maxDuration in vercel.json if needed
   - Optimize database queries for faster response

4. **Environment Variables Not Set**
   - Double-check all variables in Vercel dashboard
   - Redeploy after setting environment variables

### Database Setup
Ensure your MySQL database has all required tables:
- `staff`
- `guards`
- `premises`
- `journey_plans`
- `leaves`
- `notice_board`
- And other related tables

## 📊 Monitoring

### Vercel Analytics
- Monitor function execution times
- Check for errors in Vercel dashboard
- Review API usage statistics

### Database Monitoring
- Monitor database connection pool
- Check for slow queries
- Ensure proper indexing

## 🔄 Updates and Redeployment

### Automatic Deployment
- Connect your GitHub repository to Vercel
- Push to main branch triggers automatic deployment

### Manual Deployment
```bash
vercel --prod
```

### Environment Variable Updates
- Update in Vercel dashboard
- Redeploy to apply changes

## 📞 Support

For issues with:
- **Vercel Deployment**: Check Vercel documentation
- **Database Issues**: Verify MySQL server configuration
- **API Errors**: Check logs in Vercel dashboard
- **Flutter Integration**: Update API URLs in Flutter apps

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Database accessible from Vercel
- [ ] CORS origins updated
- [ ] Flutter apps updated with new API URL
- [ ] API documentation accessible
- [ ] Authentication working
- [ ] All endpoints tested
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Security headers enabled 