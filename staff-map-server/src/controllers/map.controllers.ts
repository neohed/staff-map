import type { Request, Response } from 'express';
import type { PlaceViewModel } from '../model/place.model';
import { selectPlaces, insertPlace } from '../model/place.model';
import { logger } from '../middleware/logger';
import { StatusCodes } from '../lib/http';

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
    })
}

async function addPlace(req: Request<{}, {}, PlaceViewModel>, res: Response): Promise<any> {
    const { body } = req;
    const { lat, lng, name, type } = body;

    try {
        const place = await insertPlace({
            lat,
            lng,
            name
        },
            type
        )

        return res.status(StatusCodes.OK).json({
            place
        })
    } catch (err) {
        logger.error(err)

        return res.status(StatusCodes.SERVER_ERROR).end()
    }
}

export {
    getPlaces,
    addPlace,
}
