// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req,
  res
) {
  if (req.method === "GET") {
    const profiles = await prisma.user.findMany();
    console.info("profiles++ ",profiles)
    return res.status(200).json(profiles);
  }

  if (req.method === "POST") {
    const { name, email } = req.body;

    const profile = await prisma.profiles.create({
      data: {
        name: name,
        // @ts-ignore
        email: email,
      },
    });

    res.status(201).json({ profile });
  }

  if (req.method === "PUT") {
    const id = req.query.id;

    const { name } = req.body;

    const profile = await prisma.profiles.update({
      where: {
        // @ts-ignore
        id: id,
      },
      data: {
        name: name,
      },
    });

    res.status(201).json({ message: "Updated" });
  }

  res.status(200).json({ name: "John Doe" });
}