-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "picture" DROP NOT NULL,
ALTER COLUMN "picture" SET DEFAULT 'https://res.cloudinary.com/dr1giexhn/image/upload/v1715435659/userProfile/pfp_ehyg3e.png';
