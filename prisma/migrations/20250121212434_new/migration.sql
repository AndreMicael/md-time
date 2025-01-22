-- AlterTable
ALTER TABLE "wordpress_posts" ADD COLUMN     "link" TEXT,
ADD COLUMN     "modified" TIMESTAMP(3),
ADD COLUMN     "modified_gmt" TIMESTAMP(3),
ADD COLUMN     "original_published_at" TIMESTAMP(3),
ADD COLUMN     "status" TEXT;
