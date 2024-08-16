// Your web app's Firebase configuration
export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY ? process.env.NEXT_PUBLIC_API_KEY : process.env.API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ? process.env.NEXT_PUBLIC_AUTH_DOMAIN : process.env.AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ? process.env.NEXT_PUBLIC_PROJECT_ID : process.env.PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET ? process.env.NEXT_PUBLIC_STORAGE_BUCKET : process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ? process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID : process.env.MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID ? process.env.NEXT_PUBLIC_APP_ID : process.env.APP_ID,
};
  