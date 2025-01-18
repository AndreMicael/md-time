-- AlterTable
ALTER TABLE "wordpress_posts" ADD COLUMN     "contentImages" TEXT[] DEFAULT ARRAY[]::TEXT[];
