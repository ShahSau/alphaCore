<p align="center">
    <h1 align="center">Alpha Core</h1>
</p>
<p align="center">
    <em>A SASS platform depecting the power of AI. </em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/ShahSau/alphaCore?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/ShahSau/alphaCore?style=flat&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/ShahSau/alphaCore?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/ShahSau/alphaCore?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>

<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white" alt="nextjs">
    <img src="https://img.shields.io/badge/chatGPT-74aa9c?style=flat&logo=openai&logoColor=white" alt="openai">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
    <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white"             alt="TypeScript">
    <img src="https://img.shields.io/badge/clerk-blueviolet?logo=clerk&logoColor=white&style=flat" alt="clerk">
    <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=flat&logo=mysql&logoColor=white" alt="mysql">
	<br>
	<img src="https://img.shields.io/badge/zod-2ea44f?logo=zod&logoColor=%23f0f0f0&style=flat" alt="zod">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
	<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white" alt="tailwind">
	<img src="https://img.shields.io/badge/Stripe-008CDD.svg?style=flat&logo=Stripe&logoColor=white" alt="Stripe">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
    <img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/zustand-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" alt="zustand">
    <img src="https://img.shields.io/badge/Framer-black?style=flat&logo=framer&logoColor=white" alt="framer_motion">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#📍-overview)
> - [📦 Features](#📦-features)
> - [📂 Repository Structure](#📂-repository-structure)
> - [🧩 Modules](#🧩-modules)
> - [🚀 Getting Started](#🚀-getting-started)
>   - [⚙️ Installation](#⚙️-installation)
>   - [🤖 Running turbo](#🤖-running-turbo)
> - [🛠 Project Roadmap](#🛠-project-roadmap)
> - [📄 License](#📄-license)

---

## 📍 Overview

Empower Your Platform with Advanced AI-Powered Features and Seamless Payment Integration 

---

## 📦 Features

Welcome to a new era of platform innovation, where cutting-edge AI technologies revolutionize user experiences and functionality. Our platform offers a comprehensive suite of features including conversation capabilities, music, image, and video generation, language-to-SQL conversion, summerazier, grammar correction, code generation, text summarization, lesson planning, interview question generation, logo creation, email generation, portrait generation, and seamless authentication and customer service with Clerk. Moreover, our platform facilitates convenient periodic payments through Stripe, ensuring a smooth and hassle-free user experience.

- Conversation Capabilities:
Enable seamless communication between users and your platform, facilitating engagement and interaction.

- AI-Powered Music Generation:
Generate unique and personalized music compositions using advanced AI algorithms, catering to diverse musical preferences.

- Image and Video Generation:
Automatically generate high-quality images and videos based on user inputs or predefined templates, simplifying content creation.

- Language-to-SQL Conversion:
Convert natural language queries into SQL queries, streamlining database interactions and enhancing user productivity.

- Summerazier and Grammar Correction:
Summarize lengthy text documents and correct grammar errors to improve readability and coherence.

- Code Generation:
Automatically generate code snippets based on specific requirements or programming tasks, accelerating development workflows.

- Text Summarization:
Generate concise summaries of large textual documents or articles, enabling users to extract key insights efficiently.

- Lesson Planner and Interview Question Generation:
Plan educational lessons and generate interview questions tailored to specific topics or subjects.

- Logo, Email, and Portrait Generation:
Create professional-grade logos, customized email templates, and digital portraits effortlessly.

- Authentication and Customer Service with Clerk:
Streamline user authentication and provide personalized customer service experiences with Clerk's advanced capabilities.

- Seamless Periodic Payments with Stripe:
Facilitate convenient periodic payments for subscriptions or services through Stripe, ensuring reliability and security.

---

## 📂 Repository Structure

```sh
└── alphacore/
    ├── components.json
    ├── app
    │    ├── (auth)
    │    │      ├──(routes)
    │    │      │    ├── sign-in
    │    │      │    │    └── page.tsx 
    │    │      │    ├── sign-up
    │    │      │         └── page.tsx 
    │    │      └── layout.tsx
    │    ├── (dashboard)
    │    │      ├──(routes)
    │    │      ├── code
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── conversation
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── dashboard
    │    │      │    └── page.tsx
    │    │      ├── email
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── grammer
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── image
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── interview
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── lesson
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── logo
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── music
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── portrail
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── settings
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── sql
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── summarize
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── summerizer
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      ├── video
    │    │      │    ├── constants
    │    │      │    └── page.tsx
    │    │      └── layout.tsx
    │    ├── (landing)
    │    │      └── page.tsx
    │    ├── api
    │    │    ├── code
    │    │    │    └── route.ts
    │    │    ├── conversation
    │    │    │    └── route.ts
    │    │    ├── email
    │    │    │    └── route.ts
    │    │    ├── grammer
    │    │    │    └── route.ts
    │    │    ├── image
    │    │    │    └── route.ts
    │    │    ├── interview
    │    │    │    └── route.ts
    │    │    ├── lesson
    │    │    │    └── route.ts
    │    │    ├── logo
    │    │    │    └── route.ts
    │    │    ├── music
    │    │    │    └── route.ts
    │    │    ├── portrait
    │    │    │    └── route.ts
    │    │    ├── sql
    │    │    │    └── route.ts
    │    │    ├── stripe
    │    │    │    └── route.ts
    │    │    ├── summarize
    │    │    │    └── route.ts
    │    │    ├── video
    │    │    │    └── route.ts
    │    │    └── webhook
    │    │    │    └── route.ts
    │    ├── assets
    │    │    └── ai.png
    │    ├── globals.css
    │    └── layout
    ├── components
    │    ├── ui
    │    │    ├── avatar
    │    │    ├── badge
    │    │    ├── button
    │    │    ├── card
    │    │    ├── dialog
    │    │    ├── form
    │    │    ├── input
    │    │    ├── label
    │    │    ├── progress
    │    │    ├── select
    │    │    └── sheet
    │    │    
    │    ├── bot-avatar
    │    ├── crisp-chat
    │    ├── crisp-provider
    │    ├── empty
    │    ├── free-counter
    │    ├── heading
    │    ├── landing-hero
    │    ├── landing-navbar
    │    ├── loader
    │    ├── mobile-sidebar
    │    ├── modal-provider
    │    ├── navbar
    │    ├── pro-modal
    │    ├── sidebar
    │    ├── subscription-button
    │    ├── toaster-provider
    │    └── use-avatar
    ├── hooks
    │    └── use-pro-modal
    ├── lib
    │    ├── api-limits
    │    ├── prismadb
    │    ├── stripe
    │    ├── subscription
    │    └── utils
    ├── prisma
    │   └── schema.prisma
    ├── middleware.ts
    ├── public
    ├── tailwind.config.js
    ├── tailwind.json
    ├── constant
    ├── .env
    ├── .env.local
    └── next.config.js



```

---
## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **node**: `version >= 18.0.0`
* **react**: `version >=18.2.0`

### ⚙️ Installation

1. Clone the turbo repository:

```sh
git clone https://github.com/ShahSau/alphaCore
```

2. Change to the project directory:

```sh
cd alphaCore
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running turbo
Create an .env file with following keys: <br />
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`<br />
`CLERK_SECRET_KEY`<br />
`NEXT_PUBLIC_CLERK_SIGN_IN_URL`<br />
`NEXT_PUBLIC_CLERK_SIGN_UP_URL`<br />
`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`<br />
`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`<br />
`OPENAI_API_KEY`<br />
`REOLICATE_API_TOKEN`<br />
`RapidAPI_Key`<br />
`RapidAPI_Host`<br />
`STRIPE_API_KEY`<br />
`NEXT_PUBLIC_APP_URL`<br />
`STRIPE_WEBHOOK_SECRET`<br />
`NEXT_PROTRAIT_API_KEY`<br />
`DATABASE_URL`

Use the following command to run turbo:

```sh
npm run dev
```

---

## 🛠 Project Roadmap

- [ ] `►  Add more AI features like resumebuild, chat`


---

## 📄 License

This project is protected under the MIT License. For more details, refer to the [LICENSE](https://github.com/ShahSau/alphaCore?tab=MIT-1-ov-file#readme) file.
