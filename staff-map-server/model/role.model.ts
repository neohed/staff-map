//import type { Role } from "@prisma/client";
import prisma from "./db";

//HACK Can't get access to Prisma generated types!
export type Role = {
    id: number
    name: string
}

const roles = {
    user: 'User',
    admin: 'Admin',
}

export {
    roles
}