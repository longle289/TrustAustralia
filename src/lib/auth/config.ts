import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Resend from 'next-auth/providers/resend';
import { prisma } from '@/lib/db';

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM || 'Trust Australia <noreply@trustaustralia.com.au>',
    }),
  ],
  pages: {
    signIn: '/auth/login',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      console.log('New user created:', user.email);
    },
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
