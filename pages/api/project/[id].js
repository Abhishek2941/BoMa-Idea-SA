// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const profiles = await prisma.access.findUnique({
      where: {
        project_id: +id
      },
      include: {
        user: true,
        project: true
      }
    });

    return res.status(200).json(profiles);
  }

  if (req.method === "POST") {
    const { name, state ,date } = req.body;

    const profile = await prisma.project.create({
      data: {
        name,
        state,
        date
      }
    });

    return res.status(201).json({ profile });
  }

  if (req.method === "PUT") {
    const id = req.query.id;

    const { name, state , project_id , date } = req.body;

    console.info("test++ ",project_id , id)

    const access = await prisma.access.findFirst({
      where: {
        user_id: +id,
        project_id: +project_id,
        permit : 'Update'
      },
      include: {
        user: true,
        project : true
      }
    });

    console.info("access+ ",access)

    if (access?.permit === "Update") {
      const profile = await prisma.project.update({
        where: {    
          // @ts-ignore
          id: access?.project?.id
        },
        data: {
          name,
          state,
          date
        }
      });
      return res.status(201).json({ message: "Updated" });
    }
    return res.status(201).json({ message: "Forbidden" });
  }

  if (req.method === "DELETE") {
    const id = req.query.id;

    const access = await prisma.access.findFirst({
      where: {
        user_id: +id,
        project_id: req.body.project_id,
        permit : 'Delete'
      },
      include: {
        user: true
      }
    });
    console.info("delete user", access.id);

    if (access?.permit === "Delete") {

      const deleteProject = await prisma.project.delete({
        where: {
          id: Number(id)
        }
      });
      
      return res.status(201).json({ message: "Forbidden" });
    }
  

    return res.status(201).json({ message: "Deleted" });
  }

  return res.status(200).json({ name: "John Doe" });
}
