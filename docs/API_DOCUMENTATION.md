# Campora REST API Documentation

Base URL: `http://localhost:8080/api/v1`

---

## Authentication Endpoints

### 1. Register User
`POST /auth/signup`
**Request Body**:
```json
{
  "name": "Aarav Sharma",
  "collegeId": "2023CS1084",
  "email": "aarav.cs@campus.edu",
  "phone": "+91 98765 43210",
  "password": "password123",
  "department": "Computer Science",
  "year": "3rd Year",
  "hosteller": true
}
```

### 2. Login User
`POST /auth/login`
**Request Body**:
```json
{
  "collegeId": "2023CS1084",
  "password": "password123"
}
```

---

## Products Endpoints

### 1. Get All Products
`GET /products`
**Query Parameters**:
- `category` (optional)
- `search` (optional)

### 2. Get Product By ID
`GET /products/{id}`

### 3. Create Product
`POST /products` (Header: `Authorization: Bearer <token>`)

---

## Admin Endpoints

### 1. Dashboard Stats
`GET /admin/dashboard` (Header: `Authorization: Bearer <admin_token>`)

### 2. Verify User
`POST /admin/verify-user?userId=user_1&status=true`
