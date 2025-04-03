# Transport Management System (TMS) – Backend

A backend service built with NestJS for managing transportation operations. This includes user management, vehicle and customer tracking, shipment coordination, and more.

---

## Features
- Authentication using JWT
- Role-based access control (RBAC)
- User & driver management
- Project & customer linking
- Vehicle & shipment item tracking
- Trip planning and coordination
- Import/export via Excel
- API documentation using Swagger

---

## Tech Stack
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + Bcrypt
- **Containerization**: Docker, Docker Compose
- **API Docs**: Swagger

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- Docker & Docker Compose

### Installation
```bash
git clone https://github.com/your-org/tms-backend.git
cd tms-backend
npm install
```

### Environment Configuration
Create a `.env` file based on `.env.example`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=tms
JWT_SECRET=super-secret
```

### Run with Docker
```bash
docker-compose up -d
```

### Run in Dev Mode
```bash
npm run start:dev
```

### API Documentation
Visit [http://localhost:3000/api](http://localhost:3000/api) for Swagger UI.

---

## Project Structure
```
src/
├── auth/              # Auth module
├── users/             # User management
├── roles/             # Role-based access
├── customers/         # Customer management
├── vehicles/          # Vehicle records
├── projects/          # Project management
├── trips/             # Trip coordination
├── shipment-items/    # Shipment item handling
├── ship-to/           # Delivery address locations
├── common/            # Common utilities, interceptors, guards
├── config/            # App configuration
├── app.module.ts      # Root module
├── main.ts            # App bootstrap
```

---

## Scripts
```bash
# Run app
yarn start

# Run in watch mode
yarn start:dev

# Build
yarn build

# Lint
yarn lint

# Test
yarn test
```

---

## License
This project is licensed under the MIT License.

