// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req,
  res
) {
  if (req.method === "GET") {
    const profiles = await prisma.user.findMany();
    return res.status(200).json(profiles);
  }

  res.status(200).json({ name: "John Doe" });
}