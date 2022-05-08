
import admin = require("firebase-admin")  
import config from "../config";


admin.initializeApp({
	credential: admin.credential.cert(config.serviceAccount),
});

export = admin;
