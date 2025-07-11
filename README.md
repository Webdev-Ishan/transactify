📱 Transactify – Money transfer app built with Next.js,Postgress,Next-auth and Razorpay

🚀 Live Demo

🧰 Tech Stack

    Frontend: Next.js / Tailwind CSS/ Shadcn / acertnity UI

    Backend: Next.js API

    Database: PostgreSQL with Prisma ORM

    Auth: NextAuth

    Payments: Razorpay SDK (test mode)

    Deployment: Vercel

🔑 Features

    ✅ Secure authentication & user sessions

    ✅ Send/receive money using UPI ID or phone number

    ✅ Razorpay payment integration

    ✅ Transaction history and logs

    ✅ Responsive UI with Tailwind CSS

    ✅ Error handling and toast notifications

📸 Screenshots

📦 Installation

    ``` git bash

     git clone https://github.com/Webdev-Ishan/transactify.git
     cd transactify
     npm install

    ```

🔐 Environment Setup

```
  DATABASE_URL=your postgress url
  NODE_ENV= "dev" || "production
  SALT= your salt for bcrypt
  RESEND_API_KEY=your resend api key
  NEXT_AUTH_SECRET= your auth secret
  GOOGLE_CLIENT_ID= google client id
  GOOGLE_CLIENT_SECRET= google client secret
  GITHUB_ID= github id
  GITHUB_SECRET= github secret
   RAZORPAY_ID= your razorpay id
   RAZORPAY_SECRET= your razorpay secret
  NEXT_PUBLIC_RAZORPAY_KEY_ID=  your razorpay id(same)

```

💻 Run Locally

```
npx prisma generate
npx prisma db push
npm run dev

```

🤝 Contributing

1 Fork this repo

2 Create a feature branch

3 Commit changes

4 Open a PR

🧑‍💼 Author

Ishan Saini
