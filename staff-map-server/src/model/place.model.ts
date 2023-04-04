import type { Place, PlaceType } from "@prisma/client";

import prisma from "./db";

export type PlaceTypes = Place & {
    placeType: PlaceType
}

async function selectPlaces(): Promise<PlaceTypes[]> {
    return await prisma.place.findMany({
        include: { placeType: true },
    })
}

export {
    selectPlaces,
}
