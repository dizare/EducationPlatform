import pg from 'pg'
import {CommandsRunner, PsqlDriver} from 'node-db-migration'
const {Client} = pg
const __dirname = import.meta.dirname;

export function establishConnection() {
    const client = new Client({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME 
    })
    client.connect(function () {
        let migrations = new CommandsRunner({
            driver: new PsqlDriver(client),
            directoryWithScripts: __dirname + '\\migrations',
        });
        migrations.run(process.argv[2]);
    })
    global.client = client
}
