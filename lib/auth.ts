import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";
export const auth = betterAuth({
  database: prismaAdapter(prisma,{
    provider: "postgresql",
  }),
  // Trusted origins for CSRF/origin validation (add your dev/prod URLs here)
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    "http://127.0.0.1:3000",
  ].filter(Boolean) as string[],
  emailAndPassword:{
    enabled: true,
    autoSignIn: true,
  }
});