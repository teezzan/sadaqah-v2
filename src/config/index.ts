export = {
    appName: 'sadaqah',
    databaseSettings: {
        databaseName: process.env.DATABASE_NAME || 'dbname',
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || 'password',
        host: process.env.DATABASE_HOST || 'localhost',
        port: +process.env.DATABASE_PORT || 3306,
        ssl: !!process.env.USE_SSL
    },
    HTTP:{
        port:+process.env.PORT || 3000
    }

}