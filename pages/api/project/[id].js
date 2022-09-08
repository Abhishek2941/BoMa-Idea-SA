// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const profiles = await prisma.access.findUnique({
      where: {
        user_id: +id,
        project_id: req.body.project_id
      },
      include: {
        user: true
      }
    });

    return res.status(200).json(profiles);
  }

  if (req.method === "POST") {
    const { name, state } = req.body;

    const profile = await prisma.projects.create({
      data: {
        name,
        state
      }
    });

    res.status(201).json({ profile });
  }

  if (req.method === "PUT") {
    const id = req.query.id;

    const { name, state } = req.body;

    const access = await prisma.access.findUnique({
      where: {
        user_id: +id,
        project_id: req.body.project_id
      },
      include: {
        user: true
      }
    });

    if (access?.permit === "Update") {
      const profile = await prisma.projects.update({
        where: {
          // @ts-ignore
          id: id
        },
        data: {
          name,
          state
        }
      });
      res.status(201).json({ message: "Updated" });
    }
    res.status(201).json({ message: "Forbidden" });
  }

  if (req.method === "DELETE") {
    const id = req.query.id;

    const access = await prisma.access.findUnique({
      where: {
        user_id: +id,
        project_id: req.body.project_id
      },
      include: {
        user: true
      }
    });

    if (access?.permit === "Delete") {
      const deleteProject = await prisma.projects.delete({
        where: {
          id
        }
      });
      res.status(201).json({ message: "Forbidden" });
    }

    res.status(201).json({ message: "Deleted" });
  }

  res.status(200).json({ name: "John Doe" });
}
