import express from "express";
import mongoose  from 'mongoose';
import bodyParser = require('body-parser');
import { authenticationMiddleware } from './middleware/authenticationMiddleware';
import { config } from "./config/config";
import AdminUsersRoutes from './app/adminUsers/AdminUsersRoutes'
import AuthRoutes from "./app/auth/AuthRoutes";

const PortfolioApp: express.Application = express();
// @ts-ignore
global.__basedir = require('path').resolve(__dirname, '..');
mongoose.connect(config.dbString, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
	console.log(`Server Connecting to Mongoo.`);
	const port: number = +config.httpPort;

	PortfolioApp
		.use(bodyParser.urlencoded({ extended: false }))
		.use(bodyParser.json())
		// @ts-ignore
		.use(express.static(__basedir + '/public'))
		.use(require("cors")())
		.use('/api/auth', AuthRoutes)
		.use(authenticationMiddleware)
		.use('/api/admin/users', AdminUsersRoutes)
		.listen(port, () => console.log(`Server Listening on port ${port}`));
}).catch((error) => console.log(`Connection to Mongoo DB Failed. ${error}`));