import type {Request, Response} from 'express';

async function getMaps(req: Request, res: Response) {
    return res.json({
        maps: []
    });
}

export {
    getMaps,
}
