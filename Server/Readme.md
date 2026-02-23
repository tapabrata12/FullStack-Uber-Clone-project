# Server API Documentation

## `POST /api/auth/register`

Registers a new user in the system. On success, it returns the created user object and sets a JWT token as an HTTP cookie.

---

## Request

### Headers

| Header         | Value              |
|----------------|--------------------|
| `Content-Type` | `application/json` |

### Body

The request body must be a **JSON object** with the following fields:

| Field        | Type     | Required | Constraints                          | Description                  |
|--------------|----------|----------|--------------------------------------|------------------------------|
| `firstName`  | `string` | ✅ Yes   | Minimum **3** characters             | User's first name            |
| `middleName` | `string` | ❌ No    | Minimum **3** characters (if provided) | User's middle name           |
| `lastName`   | `string` | ❌ No    | Minimum **3** characters (if provided) | User's last name             |
| `email`      | `string` | ✅ Yes   | Must be a valid email address        | User's unique email address  |
| `password`   | `string` | ✅ Yes   | Minimum **6** characters             | User's account password      |

### Example Request Body

```json
{
  "firstName": "John",
  "middleName": "William",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

> **Note:** `middleName` and `lastName` are optional. If they are provided, they must be at least 3 characters long. Empty strings are treated as not provided (falsy check).

---

## Responses

### ✅ `201 Created` — Registration Successful

Returns the newly created user object. A `token` JWT cookie is also set on the response.

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "fullName": {
      "firstName": "John",
      "middleName": "William",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null,
    "__v": 0
  }
}
```

> **Note:** The `password` field is **never** returned in the response. It is marked `select: false` in the database schema.

---

### ❌ `400 Bad Request` — Validation Error

Returned when one or more fields fail validation. The `errors` array lists each failing field with a message.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "Jo",
      "msg": "First name have to be atleast 3 characters long",
      "path": "firstName",
      "location": "body"
    },
    {
      "type": "field",
      "value": "abc",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

---

## Validation Rules Summary

| Field        | Rule                                      |
|--------------|-------------------------------------------|
| `email`      | Must be a valid email format              |
| `firstName`  | Required · Min length: **3**              |
| `middleName` | Optional · If present, min length: **3**  |
| `lastName`   | Optional · If present, min length: **3**  |
| `password`   | Required · Min length: **6**              |

---

## Internal Flow

```
POST /api/auth/register
        │
        ▼
 [Route: user.routes.js]
  express-validator checks all fields
        │
        ▼ (if validation passes)
 [Controller: user.register.controller.js]
  1. Runs validationResult() — returns 400 on errors
  2. Calls hashPassword(password) → bcrypt hashed string
  3. Calls createUser({ fullName, email, hashedPassword })
        │
        ▼
 [Service: createUser.service.js]
  Creates and persists user in MongoDB via userModel
        │
        ▼
 [Service: genarateAuthToken.service.js]
  Signs a JWT with the user's _id using JWT_SECRET
        │
        ▼
 [Controller]
  Sets "token" cookie on the response
  Returns 201 with { message, user }
```

---

## Password Security

Passwords are hashed using **bcrypt** with a salt round of `10` before being stored in the database. The plain-text password is **never** persisted.

```
hashPassword(password, salt = 10)  →  bcrypt.hash(password, 10)
```

---

## Auth Token

A **JWT (JSON Web Token)** is generated using the user's `_id` and the `JWT_SECRET` environment variable. The token is set as an HTTP cookie named `token` and returned to the client.

```
genarateAuthToken(user._id)  →  jwt.sign({ _id }, JWT_SECRET)
```

> ⚠️ Make sure `JWT_SECRET` is defined in your `.env` file, otherwise token generation will fail.

---

---

## `POST /api/auth/login`

Authenticates an existing user with their email and password. On success, it returns the user object and sets a JWT token as an HTTP cookie.

---

## Request

### Headers

| Header         | Value              |
|----------------|--------------------|
| `Content-Type` | `application/json` |

### Body

The request body must be a **JSON object** with the following fields:

| Field      | Type     | Required | Constraints                   | Description             |
|------------|----------|----------|-------------------------------|-------------------------|
| `email`    | `string` | ✅ Yes   | Must be a valid email address | Registered email address |
| `password` | `string` | ✅ Yes   | Minimum **6** characters      | Account password        |

### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

---

## Responses

### ✅ `200 OK` — Login Successful

Returns the authenticated user object. A `token` JWT cookie is also set on the response.

```json
{
  "message": "Login successful",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "fullName": {
      "firstName": "John",
      "middleName": "William",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null,
    "__v": 0
  }
}
```

> **Note:** The `password` field is **never** returned in the response. It is marked `select: false` in the database schema. The `findUser` service explicitly re-selects it internally (via `.select("+password")`) only to validate the login attempt.

---

### ❌ `400 Bad Request` — Validation Error

Returned when one or more fields fail validation rules.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "not-an-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "abc",
      "msg": "Password must be atleast 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

---

### ❌ `401 Unauthorized` — Invalid Credentials

Returned when the email does not exist in the database **or** the password does not match. Both cases return the same generic message to prevent user enumeration.

```json
{
  "message": "Invalid Credentials"
}
```

---

## Validation Rules Summary

| Field      | Rule                             |
|------------|----------------------------------|
| `email`    | Required · Must be a valid email |
| `password` | Required · Min length: **6**     |

---

## Internal Flow

```
POST /api/auth/login
        │
        ▼
 [Route: user.routes.js]
  express-validator checks email format and password length
        │
        ▼ (if validation passes)
 [Controller: user.login.controller.js]
  1. Runs validationResult() — returns 400 on errors
  2. Calls findUser(email) → queries MongoDB
        │
        ├── user not found → returns 401 "Invalid Credentials"
        │
        ▼ (user found)
  3. Calls compairePassword(plainPassword, hashedPassword)
     → bcrypt.compare() checks if passwords match
        │
        ├── passwords don't match → returns 401 "Invalid Credentials"
        │
        ▼ (passwords match)
  4. Calls genarateAuthToken(user._id)
        │
        ▼
 [Service: genarateAuthToken.service.js]
  Signs a JWT with the user's _id using JWT_SECRET
        │
        ▼
 [Controller]
  Sets "token" cookie on the response
  Returns 200 with { message, user }
```

---

## Password Comparison

The login flow uses **bcrypt** to compare the provided plain-text password against the stored hash. The raw password is **never** stored or logged.

```
compairePassword(userPassword, hashedPassword)  →  bcrypt.compare(userPassword, hashedPassword)
```

> **Note:** `findUser` uses `.select("+password")` to temporarily include the hashed password from MongoDB solely for comparison — it is excluded from all other queries by default (`select: false` in the schema).
