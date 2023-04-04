import type { Request, Response } from 'express';
import { selectPlaces } from '../model/place.model';

async function getPlaces(req: Request, res: Response): Promise<any> {
    const places = await selectPlaces();
    return res.json({
        places: places.map(({ id, lat, lng, name, placeType }) => ({
            id,
            lat,
            lng,
            name,
            type: placeType.name
        }))
    });
}

export {
    getPlaces,
}
