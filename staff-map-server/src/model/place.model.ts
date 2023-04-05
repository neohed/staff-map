import type { Place, PlaceType } from "@prisma/client";

import prisma from "./db";

export type PlaceViewModel = {
    lat: number;
    lng: number;
    name: string;
    type: string;
}

export type PlaceAndType = Place & {
    placeType: PlaceType
}

async function selectPlaces(): Promise<PlaceAndType[]> {
    return await prisma.place.findMany({
        include: { placeType: true },
    })
}

export async function insertPlace(
    newPlace: Pick<Place, "lat" | "lng" | "name">,
    placeType: string
) {
    const {id} = await prisma.placeType.findUnique({
        where: {name: placeType}
    });

    return prisma.place.create({ data: {
        ...newPlace,
        placeTypeId: id
    } });
}

export {
    selectPlaces,
}
