# Bulk User Management API

## Overview

This project is a backend assessment implementation of a **Bulk User Management System** built using **Node.js, Express, and MongoDB**. It supports efficient bulk user creation and bulk updates while handling partial failures gracefully.

The system is designed to handle large datasets (5000+ records) in a single request and follows clean backend architecture practices.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Validator
* CORS
* Postman (API Testing)

---

## Features

### Bulk User Creation

* Insert multiple users using a single API
* Uses MongoDB `insertMany()` for better performance
* Handles duplicate records gracefully
* Supports partial success responses

### Bulk User Update

* Update multiple users in one request
* Uses MongoDB `bulkWrite()` operation
* Allows update using:

  * Email
  * Phone number

### Error Handling

* Partial failure support
* Validation errors returned clearly
* Duplicate record detection
* Proper HTTP status codes

### Performance Optimizations

* Large payload support (50MB limit)
* Optimized bulk database operations
* Efficient update queries

---

## Project Structure

```
src/

├── config/
│   └── db.js

├── controllers/
│   └── user.controller.js

├── models/
│   └── user.model.js

├── routes/
│   └── user.routes.js

├── app.js
└── server.js

scripts/

users.json
BulkUserManagement.postman_collection.json
```

---

## Installation & Setup

### Clone Repository

```
git clone <your-repository-link>
cd Bulk-user-management
```

### Install Dependencies

```
npm install
```

### Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Run Application

```
node src/server.js
```

Server will run at:

```
http://localhost:5000
```

---

## API Endpoints

## Health Check

**GET /**

Response:

```
Bulk User Management API is running
```

---

## Bulk Create Users

**POST /api/users/bulk-create**

### Request Body

```
[
  {
    "name":"Hemanth",
    "email":"hemanth@test.com",
    "phone":"9876543210",
    "walletBalance":100
  }
]
```

### Success Response

```
{
 "success":true,
 "count":10,
 "message":"Users created successfully"
}
```

### Partial Failure Response

```
{
 "success":false,
 "message":"Some users could not be created",
 "insertedCount":8,
 "errors":[]
}
```

---

## Bulk Update Users

**PUT /api/users/bulk-update**

### Request Body

```
[
 {
   "email":"user@test.com",
   "update":{
      "walletBalance":500
   }
 }
]
```

### Response

```
{
 "success":true,
 "message":"Bulk update completed",
 "matchedCount":5,
 "modifiedCount":5
}
```

---

## Design Decisions

### Why insertMany()

Used for high-performance bulk insertion instead of multiple `save()` operations.

### Why bulkWrite()

Allows multiple update operations in a single database call which improves performance.

### Why ordered:false

Ensures one failure does not stop the entire bulk operation.

### Why email/phone identifier

Unique fields make update operations reliable and predictable.

---

## Testing

Postman collection included:

```
BulkUserManagement.postman_collection.json
```

Import into Postman to test APIs.

---

## Engineering Practices Used

* MVC architecture
* Clean folder structure
* Centralized error handling
* Validation checks
* Proper HTTP status codes
* Scalable backend design

---

## Future Improvements

If extended further:

* JWT Authentication
* Role Based Access Control (RBAC)
* Pagination support
* Unit testing (Jest)
* Docker containerization
* Request validation middleware
* Logging system
* Rate limiting

---

## Author

**Hemanth Kumar Banka**

Backend Developer focused on building scalable API systems using Node.js, MongoDB, and modern backend engineering practices.
