/*
  Warnings:

  - Added the required column `uagbFeaturedImageSrc` to the `wordpress_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wordpress_posts" ADD COLUMN     "uagbFeaturedImageSrc" JSONB NOT NULL;
