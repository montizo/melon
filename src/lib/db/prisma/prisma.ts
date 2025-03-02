import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    global.prisma.$connect();
  }

  prisma = global.prisma;
}

export default prisma;

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
