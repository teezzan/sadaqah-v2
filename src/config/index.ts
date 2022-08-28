const API_ROOT = "/api";

const config = {
  appName: "sadaqah",
  databaseSettings: {
    type: "mysql",
    database: process.env.DATABASE_NAME || "dbname",
    username: process.env.DATABASE_USERNAME || "root",
    password: process.env.DATABASE_PASSWORD || "password",
    host: process.env.DATABASE_HOST || "localhost",
    port: +process.env.DATABASE_PORT || 3306,
    ssl: !!process.env.USE_SSL,
  },
  HTTP: {
    port: +process.env.PORT || 3000,
  },
  serviceAccount: JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString(
      "ascii"
    )
  ),
  mixpanel: {
    projectToken: process.env.MIXPANEL_PROJECT_TOKEN,
    enableFlag: process.env.NODE_ENV !== "test",
  },
};

export default config;
