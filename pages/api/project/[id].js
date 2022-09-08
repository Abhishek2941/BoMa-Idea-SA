// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const profiles = await prisma.access.findFirst({
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
    const id = +req.query.id;
    const project_id = +req.query.project_id

    const access = await prisma.access.findFirst({
      where: {
          project_id,
          user_id : id,
          permit : 'Delete'
      },
      include: {
        user: true
      }
    });

    if (access?.permit === "Delete") {

      const deleteProject = await prisma.project.delete({
        where: {
          id: Number(project_id)
        }
      });
      
      return res.status(201).json({ message: "Forbidden" });
    }
  

    return res.status(201).json({ message: "Deleted" });
  }

  return res.status(200).json({ name: "John Doe" });
}
