import type { Role } from "@prisma/client";
import prisma from "./db";

export type { Role } from "@prisma/client";

const roles = {
    user: 'User',
    admin: 'Admin',
}

export {
    roles
}
