const env = process.env.NODE_ENV || "development";
require('custom-env').env();
console.log("custom-env " + process.env.NODE_ENV);
console.log("Server " + env + " Mode");
export const config = {
	dbString: process.env.MONGOO_STRING || '',
	httpPort: process.env.HTTP_PORT || '',
	JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || ''
};