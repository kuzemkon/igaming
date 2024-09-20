
# How to Run the Node.js API Server Locally

## 1. Install Dependencies

Make sure you have **Node.js** installed on your machine. If not, download it from [Node.js Official Website](https://nodejs.org/).

Once you have Node.js installed, navigate to your project directory and run the following command to install all necessary dependencies:

```bash
npm install
```

---

## 2. Set Up Environment Variables

Create a `.env` file in the root directory of your project with the following structure:

```plaintext
PORT=3000
JWT_SECRET=your-secret-key

# GCP Pub/Sub
GCP_PUBSUB_TOPIC=user-registration-topic
GCP_PROJECT_ID=your-google-cloud-project-id

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=your-db-user
PG_PASSWORD=your-db-password
PG_DATABASE=your-db-name

# Cassandra
CASSANDRA_HOST=localhost
CASSANDRA_KEYSPACE=mykeyspace

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

Make sure you update the values according to your environment (e.g., your database credentials, Redis, and Google Cloud Pub/Sub configurations).

---


## 3. Run the Server

You can run the server using **ts-node-dev** for hot-reloading or **ts-node** directly if you don't have hot-reloading set up.

### Option 1: Using `ts-node-dev` (with hot-reloading)

Run the server with:

```bash
npx ts-node-dev src/server.ts
```

### Option 2: Using `ts-node` (without hot-reloading)

If you prefer to run without hot-reloading, you can use `ts-node`:

```bash
npx ts-node src/server.ts
```

---

## 4. Access the Server

Once the server is running, you should see output like:

```bash
Server running on port 3000
```

Now, you can make API requests to the server via `http://localhost:3000`.

---

## 5. Test Endpoints

You can test the API using **Postman**, **cURL**, or any other API client.

### Register a User (POST `/api/users/register`)

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "12345"}'
```

### Login (POST `/api/users/login`)

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "12345"}'
```

### Get Session (GET `/api/users/session/:id`)

Make sure to include the JWT token in the `Authorization` header.

```bash
curl -X GET http://localhost:3000/api/users/session/<session_id> \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Logout (DELETE `/api/users/logout`)

```bash
curl -X DELETE http://localhost:3000/api/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```
