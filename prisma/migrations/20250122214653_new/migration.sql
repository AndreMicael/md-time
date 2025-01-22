/*
  Warnings:

  - You are about to drop the column `link` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `modified` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `modified_gmt` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `original_published_at` on the `wordpress_posts` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `wordpress_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "wordpress_posts" DROP COLUMN "link",
DROP COLUMN "modified",
DROP COLUMN "modified_gmt",
DROP COLUMN "original_published_at",
DROP COLUMN "status",
ALTER COLUMN "uagb_featured_image_src" DROP NOT NULL;
