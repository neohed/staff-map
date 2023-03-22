import type {Request, Response} from 'express';

async function getUsers(req: Request, res: Response) {
    return res.json({
        users: []
    });
}

export {
    getUsers,
}
