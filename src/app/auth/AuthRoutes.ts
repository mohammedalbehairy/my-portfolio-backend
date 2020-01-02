import { generateToken } from './../../helper/generateToken';
import { AdminUserSchema } from './../adminUsers/models/adminUserSchema';
import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = await AdminUserSchema.findOne({ email: req.body.email.trim().toLocaleLowerCase() });

        if (!user) return res.status(401).send({ message: 'invalid-email-or-password' });

        let validatePassword = await bcrypt.compare(req.body.password, user.password)
        if (!validatePassword) return res.status(401).send({ message: 'invalid-email-or-password' });


        const token = generateToken(user._id);

        return res.status(200).send({
            email: user.email,
            name: user.name,
            bearer: token
        });


    } catch (e) {
        return next(e)
    }
});

export default router;