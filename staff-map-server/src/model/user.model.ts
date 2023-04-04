import type { User, Role } from "@prisma/client";

import prisma from "./db";

export type UserRoles = User & {
    roles: Role[]
}

export async function selectUserByEmail(email: string): Promise<UserRoles | null> {
    return await prisma.user.findUnique({
        where: { email },
        include: { roles: true },
    })
}
