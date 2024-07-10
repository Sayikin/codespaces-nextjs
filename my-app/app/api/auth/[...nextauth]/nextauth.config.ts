import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import EmailProvider from "next-auth/providers/email";

const validateEnv = () => {
  const requiredVars = ['EMAIL_SERVER', 'EMAIL_FROM', 'SECRET'];
  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Environment variable ${varName} is required`);
    }
  });
};

validateEnv();

let prisma: PrismaClient;

try {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
} catch (error) {
  console.error("Error initializing Prisma client:", error);
  throw new Error("Failed to initialize Prisma client");
}

const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // Add more providers here dynamically
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

export default authOptions;
