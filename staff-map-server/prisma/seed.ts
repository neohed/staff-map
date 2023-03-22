import { PrismaClient } from "@prisma/client";
import type { Role } from "../src/model/role.model";
import {hashPassword} from "../src/lib/auth-hash";

const prisma = new PrismaClient();

async function seed() {
    const email = "admin@example.com";

    // Blitz everything!
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    const hashedPassword = await hashPassword('Blink182');

    await prisma.role.create({
        data: {
            name: 'User',
        },
    });
    await prisma.role.create({
        data: {
            name: 'Admin',
        },
    });

    const userRole: Role = (await prisma.role.findUnique({
        where: { name: 'User' }
    })) as Role;
    const adminRole: Role = (await prisma.role.findUnique({
        where: { name: 'Admin' }
    })) as Role;

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name: 'Administrator',
            isDisabled: false,
            roles: { connect: [{ id: adminRole.id }]}
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
