import {PrismaClient} from "@prisma/client";
import type {Role} from "../src/model/role.model";
import {hashPassword} from "../src/lib/auth-hash";

const prisma = new PrismaClient();

const roles = {
    user: 'User',
    admin: 'Admin'
}

async function seed() {
    const users = {
        bob: {
            email: 'bob@example.com',
            name: 'Bob',
            password: await hashPassword('password')
        },
        alice: {
            email: 'alice@example.com',
            name: 'Alice',
            password: await hashPassword('jspkvo0sD')
        }
    }

    // Blitz everything!
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    // Create roles
    await prisma.role.create({
        data: {
            name: roles.user,
        },
    });
    await prisma.role.create({
        data: {
            name: roles.admin,
        },
    });

    // Create users
    const userRole: Role = (await prisma.role.findUnique({
        where: {name: roles.user}
    })) as Role;
    const {alice, bob} = users;

    await prisma.user.create({
        data: {
            email: bob.email,
            password: bob.password,
            name: bob.name,
            isDisabled: false,
            roles: {connect: [{id: userRole.id}]}
        },
    });

    const adminRole: Role = (await prisma.role.findUnique({
        where: {name: roles.admin}
    })) as Role;

    await prisma.user.create({
        data: {
            email: alice.email,
            password: alice.password,
            name: alice.name,
            isDisabled: false,
            roles: {connect: [{id: adminRole.id}]}
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
