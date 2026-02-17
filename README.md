# Node REST API - Transaction Management System

> 📚 **Study Project** - A RESTful API built with modern Node.js technologies

A transaction management REST API that allows users to create, list, and manage financial transactions (credits and debits) with session-based user identification.

## 🎯 About

This is a **study project** developed to explore and practice modern Node.js technologies and REST API best practices. The application implements a complete transaction management system with user session handling and persistent data storage.

## ✨ Features

- ✅ Create new transactions (credit/debit)
- ✅ Get account summary with total balance
- ✅ List all user transactions
- ✅ View individual transaction details
- ✅ Session-based user identification
- ✅ User data isolation (users can only view their own transactions)

## 🚀 Technologies

- **[Node.js](https://nodejs.org/)** ^24.11.0 - JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Fastify](https://fastify.dev/)** - Fast and low overhead web framework
- **[Knex.js](https://knexjs.org/)** - SQL query builder and database migrations
- **[PostgreSQL](https://www.postgresql.org/)** - Production database
- **[SQLite](https://www.sqlite.org/)** - Development/test database
- **[Zod](https://zod.dev/)** - Schema validation
- **[Vitest](https://vitest.dev/)** - Fast unit test framework
- **[ESLint](https://eslint.org/)** - Code linting

## 📊 Test Coverage

![Coverage](https://img.shields.io/badge/coverage-97.82%25-brightgreen)

| Metric     | Coverage |
| ---------- | -------- |
| Statements | 97.82%   |
| Branches   | 92.85%   |
| Functions  | 100%     |
| Lines      | 97.82%   |

## 📋 Prerequisites

- Node.js >= 24.11.0
- Yarn >= 4.11.0
- PostgreSQL (for production) or SQLite (for development)

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/karllasouzza/node-rest-api.git
cd node-rest-api
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Configure the following variables in `.env`:

```env
NODE_ENV=development
DATABASE_CLIENT=sqlite # or pg for PostgreSQL
DATABASE_URL=./database/app.db # or your PostgreSQL connection string
```

4. Run database migrations:

```bash
yarn knex migrate:latest
```

## 🏃 Running the Application

### Development Mode

```bash
yarn dev
```

The server will start on `http://localhost:3333` (or your configured port).

### Production Build

```bash
yarn build
node dist/server.js
```

## 🧪 Testing

Run tests:

```bash
yarn test
```

Run tests once:

```bash
yarn test:run
```

Generate coverage report:

```bash
yarn test:coverage
```

## 📚 API Endpoints

### Transactions

#### Create Transaction

```http
POST /transactions
Content-Type: application/json

{
  "title": "Salary",
  "amount": 5000,
  "type": "credit" // or "debit"
}
```

#### List Transactions

```http
GET /transactions
```

#### Get Transaction by ID

```http
GET /transactions/:id
```

#### Get Account Summary

```http
GET /transactions/summary
```

## 🔐 Business Rules

- Transactions can be of type **credit** (adds to balance) or **debit** (subtracts from balance)
- Users are identified through session cookies between requests
- Users can only view and manage their own transactions
- Session IDs are automatically generated and managed

## 🗄️ Database Schema

### Transactions Table

| Column     | Type    | Description                     |
| ---------- | ------- | ------------------------------- |
| id         | UUID    | Primary key                     |
| title      | String  | Transaction description         |
| amount     | Decimal | Transaction amount              |
| type       | String  | Transaction type (credit/debit) |
| session_id | UUID    | User session identifier         |
| created_at | Date    | Creation timestamp              |

## 📦 Project Structure

```
src/
├── @types/         # TypeScript type definitions
├── env/            # Environment configuration
├── middlewares/    # Custom middlewares
├── routes/         # API routes
│   └── transactions/
├── app.ts          # Fastify app configuration
├── database.ts     # Database connection
└── server.ts       # Server entry point

database/
└── migrations/     # Database migrations

tests/              # Test files
```

## 🛠️ Available Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn test` - Run tests in watch mode
- `yarn test:run` - Run tests once
- `yarn test:coverage` - Generate coverage report
- `yarn lint` - Run ESLint
- `yarn knex` - Run Knex CLI commands

## 📝 License

This is a study project and is available for educational purposes.

## 👤 Author

**Karlla Souza**

- GitHub: [@karllasouzza](https://github.com/karllasouzza)

---

⭐ If this project helped you learn something new, consider giving it a star!
