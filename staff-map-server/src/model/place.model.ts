import type { Place } from "@prisma/client";

import prisma from "./db";

async function selectPlaces(): Promise<Place[]> {
    return await prisma.place.findMany()
}

export {
    selectPlaces,
}
