import { PrismaClient } from "@prisma/client";
import cron from "node-cron";

const prisma = new PrismaClient();

async function deleteExpiredLinks() {
  const currentDate = new Date();
  const deletedLinks = await prisma.shortLink.deleteMany({
    where: {
      expiresAt: {
        lte: currentDate,
      },
    },
  });

  console.log(`Deleted ${deletedLinks.count} expired links`);
}

// Schedule the task to run every hour
cron.schedule("0 0 * * *", () => {
  console.log("Running expired links cleanup...");
  deleteExpiredLinks().catch((e) => console.error(e));
});
