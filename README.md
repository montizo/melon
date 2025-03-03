# Melon - Authentication System in NextJS

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (vXX.X.X or later) – [Download here](https://nodejs.org)
- **PostgreSQL** – [Install PostgreSQL](https://www.postgresql.org/download/)
- **Redis** (optional if using Redis) – [Install Redis](https://redis.io/download)

You’ll also need a Redis instance running if your project integrates Redis.

## Installation

Follow these steps to install and run the project locally:
**1. Clone the repository**

```bash
git clone https://github.com/montizo/melon.git
cd melon/
```

**2. Install dependencies**

```
npm install
```

**3. Set up Prisma/PostgreSQL database**
Setup the PostgreSQL database with the following:

```
psql
=> CREATE DATABASE melon;
```

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://johndoe:password@localhost:5432/melon?schema=public"
NEXT_PUBLIC_BASE_URL = "http://localhost:3000" # default for local hosting
```

Run Prisma generate to connect your database schema:

```
npx prisma generate
```

**4. Start the project**
Run the following command to start the project:

```
npm run dev
```
