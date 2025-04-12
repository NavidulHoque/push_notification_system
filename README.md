# NestJS Push Notification System

A backend service built with **NestJS** to send **push notifications** to users, either **immediately** or at a **scheduled time** using either **Redis + Bull** or **Cron jobs**.

---

## Features

- Send immediate notifications to all users
- Schedule notifications via:
  - `Bull + Redis`
  - `Cron jobs`
- Follows NestJS best practices (Modules, DTOs, Services, Validation)
- Includes a simple mock user service with 10 hardcoded users, each having an id, name, and deviceToken — no database required.

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

####  Step-by-Step

#### 1. Install Docker

If you don’t already have Docker installed, [download it here](https://www.docker.com/products/docker-desktop/) and make sure it’s running:

```bash
docker --version
```

#### 2. Run Redis Container

```bash
docker run -d --name redis-server -p 6379:6379 redis
```

#### 3. Test Redis Is Running

```bash
docker exec -it redis-server redis-cli
ping
```

Expected response:
```bash
PONG
```

#### 4. Redis via Docker Compose (Optional)

If you're managing multiple services, you can use docker-compose.yml:

```bash
version: '3'
services:
  redis:
    image: redis
    container_name: redis-server
    ports:
      - '6379:6379'
```

Then run:

```bash
docker-compose up -d
```

To follow Redis logs:

```bash
docker-compose logs -f
```

### 4. Start the App
```bash
npm run start:dev
```

App will be available at: `http://localhost:3000`

---

## API Endpoints

### POST `/push/send-now`
Send a notification immediately to all users.

#### Payload
```json
{
  "title": "Promo Alert",
  "message": "Get 20% OFF!"
}
```

#### Example Output

```bash
Sent to User1 (token_1): Promo Alert - Get 20% OFF!
Sent to User2 (token_2): Promo Alert - Get 20% OFF!
Sent to User3 (token_3): Promo Alert - Get 20% OFF!
Sent to User4 (token_4): Promo Alert - Get 20% OFF!
Sent to User5 (token_5): Promo Alert - Get 20% OFF!
Sent to User6 (token_6): Promo Alert - Get 20% OFF!
Sent to User7 (token_7): Promo Alert - Get 20% OFF!
Sent to User8 (token_8): Promo Alert - Get 20% OFF!
Sent to User9 (token_9): Promo Alert - Get 20% OFF!
Sent to User10 (token_10): Promo Alert - Get 20% OFF!
```
---

### POST `/push/schedule`
Schedule a notification for later delivery.

#### Payload
```json
{
  "title": "Flash Sale",
  "message": "Starts at 5PM!",
  "scheduleAt": "2025-04-05T17:00:00.000Z"
}
```
- `scheduleAt`: Must be a future valid ISO timestamp.

#### Example Output with Bull Queue + Redis

```bash
[Scheduled] Sent to User1 [token_1]: Promo Alert - Get 20% OFF!
[Scheduled] Sent to User2 [token_2]: Promo Alert - Get 20% OFF!
[Scheduled] Sent to User3 [token_3]: Promo Alert - Get 20% OFF!
[Scheduled] Sent to User4 [token_4]: Promo Alert - Get 20% OFF!
[Scheduled] Sent to User5 [token_5]: Promo Alert - Get 20% OFF!
[Scheduled] Sent to User6 [token_6]: Promo Alert - Get 20% OFF!
[Scheduled] Sent to User7 [token_7]: Promo Alert - Get 20% OFF!
[Scheduled] Sent to User8 [token_8]: Promo Alert - Get 20% OFF!
[Scheduled] Sent to User9 [token_9]: Promo Alert - Get 20% OFF!
[Scheduled] Sent to User10 [token_10]: Promo Alert - Get 20% OFF!
```

If the notification data is corrupted, then the endpoint will send this error response:

```bash
Error sending notification job_id:[1]: Corrupted notification data, skipping...
```

#### Example Output with Cron Job
```bash
[CRON] Sent to User1 [token_1]: Every Minute Cron Notification
[CRON] Sent to User2 [token_2]: Every Minute Cron Notification
[CRON] Sent to User3 [token_3]: Every Minute Cron Notification
[CRON] Sent to User4 [token_4]: Every Minute Cron Notification
[CRON] Sent to User5 [token_5]: Every Minute Cron Notification
[CRON] Sent to User6 [token_6]: Every Minute Cron Notification
[CRON] Sent to User7 [token_7]: Every Minute Cron Notification
[CRON] Sent to User8 [token_8]: Every Minute Cron Notification
[CRON] Sent to User9 [token_9]: Every Minute Cron Notification
[CRON] Sent to User10 [token_10]: Every Minute Cron Notification
```
---

## How Scheduling Works

### 1. Bull + Redis
- Adds a job to `pushQueue` with a `delay` until the scheduled time.
- At execution, `BullProcessor` sends the notification to the 10 users.

### 2. Cron Job
- Sends cron notifications to 10 users every minute.

---

## Mock Users
The app simulates a table of 10 users:
```ts
{
  id: 1,
  name: 'User1',
  deviceToken: 'token_1'
},
{
  id: 2,
  name: 'User2',
  deviceToken: 'token_2'
},
{
  id: 3,
  name: 'User3',
  deviceToken: 'token_3'
},
{
  id: 4,
  name: 'User4',
  deviceToken: 'token_4'
},
{
  id: 5,
  name: 'User5',
  deviceToken: 'token_5'
},
{
  id: 6,
  name: 'User6',
  deviceToken: 'token_6'
},
{
  id: 7,
  name: 'User7',
  deviceToken: 'token_7'
},
{
  id: 8,
  name: 'User8',
  deviceToken: 'token_8'
},
{
  id: 9,
  name: 'User9',
  deviceToken: 'token_9'
},
{
  id: 10,
  name: 'User10',
  deviceToken: 'token_10'
}
```

---

## Tech Stack
- NestJS
- class-validator
- Bull + Redis
- Cron jobs

---

## Author
**Md. Navidul Hoque**

---

## License
MIT
