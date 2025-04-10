NestJS Push Notification System

A backend service built with NestJS to send push notifications to users, either immediately or at a scheduled time using either Redis + Bull or cron jobs.

📦 Features

🔔 Send immediate notifications to all users

📅 Schedule notifications via:

Bull + Redis

node-cron

✅ Follows NestJS best practices (Modules, DTOs, Services, Validation)

🧪 Includes simple in-memory mock user service (10 users)

🛠️ Setup Instructions

1. Clone the Repository

git clone https://github.com/your-username/nest-push-notifications.git
cd nest-push-notifications

2. Install Dependencies

npm install

3. Install Redis (For Bull Queue)

If Redis is not installed:

# On macOS (with Homebrew)
brew install redis

# On Ubuntu
sudo apt-get install redis

Start Redis:

redis-server

4. Start the App

npm run start:dev

App will be available at: http://localhost:3000

📮 API Endpoints

POST /push/send-now

Send a notification immediately to all users.

Payload

{
  "title": "Promo Alert",
  "message": "Get 20% OFF!"
}

POST /push/schedule

Schedule a notification for later delivery.

Payload

{
  "title": "Flash Sale",
  "message": "Starts at 5PM!",
  "scheduleAt": "2025-04-05T17:00:00.000Z",
  "method": "queue" // or "cron"
}

scheduleAt: Must be a valid ISO timestamp.

method: Optional. Defaults to queue. Can also be cron.

📦 How Scheduling Works

1. Bull + Redis

Adds a job to pushQueue with a delay until the scheduled time.

At execution, BullProcessor logs the notification.

2. node-cron

Converts the scheduleAt ISO time into a cron expression.

Registers a one-time cron.schedule() to execute the notification.

Note: node-cron schedules are ephemeral and exist only in-memory.

👥 Mock Users

The app simulates a table of 10 users:

{
  id: 1,
  name: 'User1',
  deviceToken: 'token_1'
}

🔍 Example Output

/push/send-now

📲 Sent to User1 (token_1): Promo Alert - Get 20% OFF!
...

/push/schedule with Bull

🔔 (Bull) Notification sent: Flash Sale - Starts at 5PM!

/push/schedule with Cron

🔔 (Cron) Notification sent: Flash Sale - Starts at 5PM!

📌 Tech Stack

NestJS

class-validator

Bull + Redis

node-cron

🧑‍💻 Author

Md. Navidul Hoque

📜 License

MIT

