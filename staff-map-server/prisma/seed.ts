import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
    const email = "a@b.c";

    // Blitz everything!
    await prisma.image.deleteMany();
    await prisma.post.deleteMany();
    await prisma.draftTranslation.deleteMany();
    await prisma.draft.deleteMany();

    await prisma.user.delete({ where: { email } }).catch(() => {
        // dev null
    });

    const hashedPassword = await bcrypt.hash("blink182", 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });

    await prisma.draft.create({
        data: {
            slug: 'first-post',
            isLive: false,
            userId: user.id,
        },
    });

    console.log(`Database has been seeded. 🌱`);
}

seed()
    .then(() => {
        console.log('Prisma seed function in prisma/seed.ts executed!')
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
