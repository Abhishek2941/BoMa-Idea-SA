-- DropForeignKey
ALTER TABLE "Access" DROP CONSTRAINT "Access_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Access" DROP CONSTRAINT "Access_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
