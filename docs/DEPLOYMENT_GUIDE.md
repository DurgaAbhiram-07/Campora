# Campora Production Deployment Guide

## 1. Frontend (Vercel)
1. Push `frontend/` directory to GitHub.
2. Link repository to Vercel.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Environment Variable: `VITE_API_URL=https://campora-backend.onrender.com/api/v1`

## 2. Backend (Render / Railway)
1. Push `backend/` directory to GitHub.
2. Select Java Web Service environment.
3. Build Command: `./mvnw clean package -DskipTests`
4. Start Command: `java -jar target/campora-backend-1.0.0.jar`
5. Configure Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

## 3. Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas.
2. Whitelist `0.0.0.0/0` for IP access.
3. Copy connection string to `MONGODB_URI`.
