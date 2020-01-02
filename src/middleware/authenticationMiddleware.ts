import { AdminUserSchema } from '../app/adminUsers/models/adminUserSchema';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticationMiddleware = async function (req: Request, res: Response, next: NextFunction) {
	const bearerHeader = req.header('Authorization');
	if (!bearerHeader) return res.status(401).send('Access denied. No token provided.');

	let bearer = bearerHeader.split(' ');
	let bearerToken = bearer[1];
	try {
		const decoded: any = jwt.verify(bearerToken, process.env.JWT_PRIVATE_KEY!);
		const adminUser = await AdminUserSchema.findById(decoded._id);

		if (!adminUser) return res.status(401).send('Invalid token.');
		res.locals.adminUser = adminUser;

		return next();
	} catch (ex) {
		res.status(401).send('Invalid token.');
	}
}