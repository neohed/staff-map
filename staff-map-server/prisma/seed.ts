import { PlaceType, PrismaClient } from "@prisma/client";
import type { Role } from "../src/model/role.model";
import { hashPassword } from "../src/lib/auth-hash";

const prisma = new PrismaClient();

const roles = {
    user: 'User',
    admin: 'Admin'
}

const placeTypes = {
    office: 'Office',
    person: 'Person'
}

const places = [{
    name: 'London',
    lat: 51.46068959953742,
    lng: -0.11761110593424766
}, {
    name: 'Manchester',
    lat: 53.46920731944265,
    lng: -2.28130645575593
}, {
    name: 'Gloucester',
    lat: 51.862171487398115,
    lng: -2.2499496322664654
}, {
    name: 'Edingburgh',
    lat: 55.93342871542153,
    lng: -3.220279401226982
}]

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
    const { alice, bob } = users;

    // Blitz everything!
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    await prisma.place.deleteMany();
    await prisma.placeType.deleteMany();

    // Create roles
    const userRole: Role = await prisma.role.create({
        data: {
            name: roles.user,
        },
    });
    const adminRole: Role = await prisma.role.create({
        data: {
            name: roles.admin,
        },
    });

    // Create users
    await prisma.user.create({
        data: {
            email: bob.email,
            password: bob.password,
            name: bob.name,
            isDisabled: false,
            roles: { connect: [{ id: userRole.id }] }
        },
    });

    await prisma.user.create({
        data: {
            email: alice.email,
            password: alice.password,
            name: alice.name,
            isDisabled: false,
            roles: { connect: [{ id: adminRole.id }] }
        },
    });

    //Create Places
    const office: PlaceType = await prisma.placeType.create({
        data: {
            name: placeTypes.office,
        },
    });
    const person: PlaceType = await prisma.placeType.create({
        data: {
            name: placeTypes.person,
        },
    });

    await Promise.all(places.map(place => prisma.place.create({
        data: {
            name: place.name,
            lat: place.lat,
            lng: place.lng,
            placeTypeId: office.id
        }
    })))

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
