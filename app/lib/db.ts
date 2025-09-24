import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// use the prisma singleton