//import type { User } from "@prisma/client";

import prisma from "./db";

//export type { User } from "@prisma/client";
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    isDisabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    roles: string[];
}

export async function getUserByEmail(email: string): Promise<User> {
    return await prisma.user.findUnique({
        where: { email }
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