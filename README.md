# SEMP (shareable event management portal)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
<img src="https://img.shields.io/badge/-Typescript-black.svg?logo=typescript&style=for-the-badge">

## Network Diagram

<img src='https://github.com/taro710/sharing-event-management-portal/blob/main/network.png' />

## Getting Started Dev Server

```bash
npm run dev
# or
yarn dev
```

## Storybook

```bash
npm run storybook
# or
yarn storybook
```

## Environment variables

Set `env.development` at project root.

| Name                                     | Description                         |
| ---------------------------------------- | ----------------------------------- |
| FE_BASE_URL                              | http://localhost:3000               |
| NEXT_PUBLIC_FIREBASE_API_KEY             | apiKey of firebaseConfig            |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN         | authDomain of firebaseConfig        |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID          | projectId of firebaseConfig         |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET      | storageBucket of firebaseConfig     |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | messagingSenderId of firebaseConfig |
| NEXT_PUBLIC_FIREBASE_APP_ID              | appId of firebaseConfig             |
| NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID      | measurementId of firebaseConfig     |
