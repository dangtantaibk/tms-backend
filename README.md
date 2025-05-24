# Transport Management System (TMS) – Backend

A backend service built with NestJS for managing transportation operations using microservice architecture. This includes user management, vehicle and customer tracking, shipment coordination, and more.

---

## 🏗️ Architecture Overview

The TMS Backend is designed using a microservice architecture with API Gateway pattern, separating business logic into independent services that communicate via TCP protocol.

```
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway (Main App)                   │
│                              Port: 3000                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ Auth Controller │  │ Users Controller│  │ Roles Controller│  │
│  │   /auth/*       │  │   /users/*      │  │   /roles/*      │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│           │                    │                    │           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Auth Service   │  │ Users Service   │  │ Roles Service   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│           │                    │                    │           │
│           └────────────────────┼────────────────────┘           │
│                                │                                │
│  ┌─────────────────────────────┼─────────────────────────────┐  │
│  │         Microservice Client │ Manager                     │  │
│  │              (TCP Communication Layer)                    │  │
│  └─────────────────────────────┼─────────────────────────────┘  │
└─────────────────────────────────┼───────────────────────────────┘
                                  │ TCP Communication
                                  │ Host: ip_microservice:3003
┌─────────────────────────────────┼────────────────────────────────┐
│              User Microservice  │                                │
│                              Port: 3003                          │
│  ┌─────────────────────────────┴─────────────────────────────┐   │
│  │                User Microservice Controller               │   │
│  │              Message Patterns Handler                     │   │
│  └─────────────────────────────┬─────────────────────────────┘   │
│                                │                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │ Users Service   │  │ Roles Service   │  │ Database Layer  │   │
│  │ (Business Logic)│  │ (Business Logic)│  │   (TypeORM)     │   │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘   │
│           │                    │                    │            │
│           └────────────────────┼────────────────────┘            │
│                                │                                 │
│  ┌─────────────────────────────┼─────────────────────────────┐   │
│  │                    PostgreSQL Database                    │   │
│  └───────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### 🎯 Architecture Benefits

- **Clear Separation of Concerns**: API Gateway handles HTTP requests only, while User Microservice processes business logic
- **Scalability**: Each service can be scaled independently based on demand
- **Maintainability**: Easier to maintain and develop with isolated services
- **Fault Tolerance**: Failures in one service don't affect the entire system
- **Technology Agnostic**: Microservices can use different technology stacks

---

## Features
- **Authentication using JWT with microservice integration**
- **Role-based access control (RBAC) via TCP communication**
- **Distributed user & driver management**
- **Project & customer linking through microservices**
- **Vehicle & shipment item tracking**
- **Trip planning and coordination**
- **Import/export via Excel**
- **API documentation using Swagger**
- **TCP-based microservice communication**

---

## Tech Stack
- **Framework**: [NestJS](https://nestjs.com/)
- **Architecture**: Microservices with TCP communication
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + Bcrypt
- **Communication**: @nestjs/microservices (TCP)
- **Containerization**: Docker, Docker Compose
- **API Docs**: Swagger

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- Docker & Docker Compose
- Access to User Microservice (ip_microservice:3003)

### Installation
```bash
git clone https://github.com/your-org/tms-backend.git
cd tms-backend
npm install
```
# If you encounter bcrypt issues, rebuild it:
npm rebuild bcrypt --build-from-source

### Environment Configuration
Create a `.env` file based on `.env.example`:
```env
# JWT Configuration
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d

# Microservice Configuration
USER_MICROSERVICE_HOST=ip_microservice
USER_MICROSERVICE_PORT=3003

# Application Configuration
PORT=3000
NODE_ENV=production

# Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=10

# Legacy Database Configuration (if needed)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=tms
```

### 🧪 Test Microservice Connection

Before running the application, test the microservice connection:

```bash
# Test microservice connectivity
npx ts-node test-microservice-client.ts
```

Expected output:
```
✅ Connected to microservice successfully
🧪 Starting microservice tests...
📋 Test 1: Find All Users
✅ Find All Users Result: [...]
```

### Database Configuration (Legacy)
Example `docker-compose.yml` configuration for PostgreSQL:
```yml
version: '3.8'
services:
  postgres:
    image: postgres:latest
    container_name: tms-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres      # Should match DATABASE_USER in .env
      POSTGRES_PASSWORD: postgres  # Should match DATABASE_PASSWORD in .env
      POSTGRES_DB: tms            # Should match DATABASE_NAME in .env
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Run the API Gateway
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

### API Documentation
Visit [http://localhost:3000/api](http://localhost:3000/api) for Swagger UI.

---

## 📡 Microservice Integration

### Message Patterns API

#### User Operations
| Pattern | Payload | Response | Description |
|---------|---------|----------|-------------|
| `user.create` | `CreateUserDto` | `User` | Create new user |
| `user.findAll` | `{}` | `User[]` | Get all users |
| `user.findById` | `string (id)` | `User` | Find user by ID |
| `user.findByEmail` | `string (email)` | `User` | Find user by email |
| `user.update` | `{id: string, updateUserDto: UpdateUserDto}` | `User` | Update user |
| `user.delete` | `string (id)` | `{message: string}` | Delete user |
| `user.getUserPermissions` | `string (userId)` | `string[]` | Get user permissions |

#### Role Operations
| Pattern | Payload | Response | Description |
|---------|---------|----------|-------------|
| `role.create` | `CreateRoleDto` | `Role` | Create new role |
| `role.findAll` | `{}` | `Role[]` | Get all roles |
| `role.findById` | `string (id)` | `Role` | Find role by ID |
| `role.update` | `{id: string, updateRoleDto: UpdateRoleDto}` | `Role` | Update role |
| `role.delete` | `string (id)` | `{message: string}` | Delete role |

### Health Check
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-05-24T10:30:00.000Z",
  "microservices": {
    "userService": "connected"
  }
}
```

---

## Project Structure
```
src/
├── auth/                           # Authentication & authorization
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── guards/
│   └── strategies/
├── users/                          # User management (API Gateway)
│   ├── users.controller.ts
│   ├── users.service.ts            # TCP client calls
│   ├── dto/
│   └── entities/
├── roles/                          # Role management (API Gateway)
│   ├── roles.controller.ts
│   ├── roles.service.ts            # TCP client calls
│   ├── dto/
│   └── entities/
├── common/
│   ├── microservices/
│   │   ├── microservice-client.manager.ts
│   │   └── microservice.module.ts
│   ├── guards/
│   ├── decorators/
│   └── logging/
├── customers/                      # Customer management
├── vehicles/                       # Vehicle management
├── projects/                       # Project management
├── trips/                          # Trip management
├── dispatch/                       # Dispatch operations
├── hubs/                          # Hub management
├── ship-to/                       # Shipping destinations
├── shipment-items/                # Shipment items handling
├── shipping-orders/               # Shipping orders management
├── import/                        # Import functionality
├── export/                        # Export functionality
├── app.module.ts                  # Root module
├── main.ts                        # Application entry point
test-microservice-client.ts        # Microservice test client
```

---

## 🔧 Development Scripts

```bash
# Run app
npm start

# Run in watch mode
npm start:dev

# Build
npm run build

# Lint
npm run lint

# Test
npm test

# Test microservice connection
npx ts-node test-microservice-client.ts
```

---

## 🚀 Deployment

### Docker Configuration

```dockerfile
# API Gateway
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
USER_MICROSERVICE_HOST=ip_microservice
USER_MICROSERVICE_PORT=3003
JWT_SECRET=production-secret-key
```

---

## 📊 Monitoring & Health Checks

### Health Check Endpoint
```
GET /health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2025-05-24T10:30:00.000Z",
  "microservices": {
    "userService": "connected"
  }
}
```

### Logging
- Request/Response logging
- Microservice communication logs
- Error tracking and monitoring
- Performance metrics

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Test microservice integration (`npx ts-node test-microservice-client.ts`)
4. Commit changes (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open Pull Request

---

## 📄 License
This project is licensed under the MIT License.