import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    { level: "info", emit: "event" },
    { level: "info", emit: "stdout" },
  ],
});

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prisma,
};
