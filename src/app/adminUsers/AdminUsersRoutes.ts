import { AdminUserSchema } from './models/adminUserSchema';
import { Router, Request, Response, NextFunction } from 'express';
import { hash, genSalt } from 'bcryptjs';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

        ////       logic is here---------////
        let user = req.body;
         user.password = await hash(req.body.password, await genSalt(10));
        const createdUser = await AdminUserSchema.create(user);

        return res.status(200).send({
            msg: 'Ok'
        });
    } catch (e) {
        return next(e)
    }
});

export default router;