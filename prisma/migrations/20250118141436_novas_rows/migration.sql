/*
  Warnings:

  - You are about to drop the column `authorName` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `contentImages` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `featuredImage` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `readingTime` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `uagbFeaturedImageSrc` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `wordpress_posts` table. All the data in the column will be lost.
  - Added the required column `published_at` to the `wordpress_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uagb_featured_image_src` to the `wordpress_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `wordpress_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wordpress_posts" DROP COLUMN "authorName",
DROP COLUMN "contentImages",
DROP COLUMN "createdAt",
DROP COLUMN "featuredImage",
DROP COLUMN "publishedAt",
DROP COLUMN "readingTime",
DROP COLUMN "uagbFeaturedImageSrc",
DROP COLUMN "updatedAt",
ADD COLUMN     "author_name" TEXT,
ADD COLUMN     "content_images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "featured_image" TEXT,
ADD COLUMN     "featured_image_sizes" TEXT,
ADD COLUMN     "published_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reading_time" TEXT,
ADD COLUMN     "uagb_featured_image_src" JSONB NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
