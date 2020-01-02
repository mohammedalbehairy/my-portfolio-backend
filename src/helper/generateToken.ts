import { config } from './../config/config';
import { ObjectId } from "bson";
import jwt from "jsonwebtoken";

export const generateToken = (id: ObjectId) => {
	return jwt.sign({ _id: id }, config.JWT_PRIVATE_KEY, { expiresIn: 60 * 60 * 24 * 30 });
};