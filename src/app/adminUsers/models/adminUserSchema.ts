import { ObjectID } from 'bson';
import { Schema, Document, model } from "mongoose";

export interface IAdminUserCreate {
    name: string;
    email: string;
    password: string;
}


const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String
    }
});

export interface IAdminUserDocument extends Document, IAdminUserCreate {
    _id: ObjectID
}

export const AdminUserSchema = model<IAdminUserDocument>('AdminUsers', schema);
