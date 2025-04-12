# NestJS Push Notification System

A backend service built with **NestJS** to send **push notifications** to users, either **immediately** or at a **scheduled time** using either **Redis + Bull** or **cron jobs**.

---

## Features

- Send immediate notifications to all users
- Schedule notifications via:
  - `Bull + Redis`
  - `node-cron`
- Follows NestJS best practices (Modules, DTOs, Services, Validation)
- Includes simple in-memory mock user service (10 users)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/NavidulHoque/push_notification_system.git
cd push_notification_system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Redis Setup with Docker

If you don’t have Redis installed locally, you can use Docker:

## Step-by-Step

## 1. Install Docker

If you don’t already have Docker installed, [download it here](https://www.docker.com/products/docker-desktop/) and make sure it’s running:

```bash
docker --version
```

## 2. Run Redis Container

```bash
docker run -d --name redis-server -p 6379:6379 redis
```

## 2. Test Redis Is Running

```bash
docker exec -it redis-server redis-cli
ping
```

Expected response:
```bash
PONG
```

### 4. Start the App
```bash
npm run start:dev
```

App will be available at: `http://localhost:3000`

---

## 📮 API Endpoints

### POST `/push/send-now`
Send a notification immediately to all users.

#### Payload
```json
{
  "title": "Promo Alert",
  "message": "Get 20% OFF!"
}
```

---

### POST `/push/schedule`
Schedule a notification for later delivery.

#### Payload
```json
{
  "title": "Flash Sale",
  "message": "Starts at 5PM!",
  "scheduleAt": "2025-04-05T17:00:00.000Z",
  "method": "queue" // or "cron"
}
```
- `scheduleAt`: Must be a valid ISO timestamp.
- `method`: Optional. Defaults to `queue`. Can also be `cron`.

---

## 📦 How Scheduling Works

### 1. Bull + Redis
- Adds a job to `pushQueue` with a `delay` until the scheduled time.
- At execution, `BullProcessor` logs the notification.

### 2. node-cron
- Converts the `scheduleAt` ISO time into a cron expression.
- Registers a one-time `cron.schedule()` to execute the notification.

> Note: `node-cron` schedules are ephemeral and exist only in-memory.

---

## 👥 Mock Users
The app simulates a table of 10 users:
```ts
{
  id: 1,
  name: 'User1',
  deviceToken: 'token_1'
}
```

---

## 🔍 Example Output

### `/push/send-now`
```bash
📲 Sent to User1 (token_1): Promo Alert - Get 20% OFF!
...
```

### `/push/schedule` with Bull
```bash
🔔 (Bull) Notification sent: Flash Sale - Starts at 5PM!
```

### `/push/schedule` with Cron
```bash
🔔 (Cron) Notification sent: Flash Sale - Starts at 5PM!
```

---

## 📌 Tech Stack
- NestJS
- class-validator
- Bull + Redis
- node-cron

---

## 🧑‍💻 Author
**Md. Navidul Hoque**

---

## 📜 License
MIT
