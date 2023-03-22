import { PrismaClient } from "@prisma/client";
import {hashPassword} from "../lib/auth-hash";

const prisma = new PrismaClient();

async function seed() {
    const email = "admin@example.com";

    // Blitz everything!
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    const hashedPassword = await hashPassword('Blink182');

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            isDisabled: false,
        },
    });

    await prisma.role.create({
        data: {
            name: 'admin',
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
