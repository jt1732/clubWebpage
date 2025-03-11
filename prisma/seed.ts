import { Prisma, PrismaClient } from '@prisma/client'
import { create } from 'domain'
import { emitWarning, title } from 'process'
const prisma = new PrismaClient()

const initalPosts: Prisma.PostCreateInput[] = [
    {
        title: 'Post 1',
        slug: 'Post-1',
        content: 'Content of post 1',

        author: {
            connectOrCreate: {
                where: {
                    email: 'john@gmail.com',
                },
                create: {
                    email: 'john@gmail.com',
                    hashedPassword: 'dfudgfsjfds',
                },
            },
        },
    },
]; 

async function main() {
    console.log(`Start seeding ...`);

    for (const post of initalPosts) {
        const newPost = await prisma.post.create({
            data: post,
        });
        console.log(`Created post with id: ${newPost.id}`);
    }
    console.log(`Finished Seeding`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })