//import type { User } from "@prisma/client";
import type {Role} from "./role.model";
import prisma from "./db";

//export type { User } from "@prisma/client";
//HACK Can't get access to Prisma generated types!
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    isDisabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    roles: Role[];
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { email },
        include: { roles: true },
    })
}

/*
export async function verifyLogin(
    email: User["email"],
    password: Password["hash"]
) {
    const userWithPassword = await prisma.users.findUnique({
        where: { email },
        include: {
            password: true,
        },
    });

    if (!userWithPassword || !userWithPassword.password) {
        return null;
    }

    const isValid = await bcrypt.compare(
        password,
        userWithPassword.password.hash
    );

    if (!isValid) {
        return null;
    }

    const { password: _password, ...userWithoutPassword } = userWithPassword;

    return userWithoutPassword;
}

export async function getUserById(id: User["id"]) {
    return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: {
            email,
            password: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });
}

export async function deleteUserByEmail(email: User["email"]) {
    return prisma.user.delete({ where: { email } });
}
 */