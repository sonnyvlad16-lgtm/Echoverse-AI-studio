# API Documentation - EchoverseAI Studio

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. Generare Conținut

**POST** `/generate`

Autentificare: Bearer Token (JWT)

**Body:**
```json
{
  "type": "image",
  "prompt": "A cat astronaut on Mars",
  "style": "cyberpunk",
  "tone": null
}
```

**Response:**
```json
{
  "type": "image",
  "url": "https://...",
  "prompt": "A cat astronaut on Mars",
  "style": "cyberpunk"
}
```

---

### 2. Autentificare

#### Register
**POST** `/auth/register`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "plan": "free",
    "credits_remaining": 3
  }
}
```

---

### 3. Plăți (Stripe)

**POST** `/payments/checkout`

Autentificare: Bearer Token

**Body:**
```json
{
  "plan": "pro"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_..."
}
```

---

## Rate Limiting

- Free plan: 3 generații/zi
- Pro plan: 100 generații/zi
- Enterprise: Nelimitat

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Internal Server Error
