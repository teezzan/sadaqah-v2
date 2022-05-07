
import admin = require("firebase-admin")  
import config = require("../config");

admin.initializeApp({
	credential: admin.credential.cert(config.serviceAccount),
});

export = admin;
