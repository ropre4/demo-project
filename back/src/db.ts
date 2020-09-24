import { createConnection } from "typeorm";


export async function getDbConnection() {

    const conn = await createConnection(process.env.APP_ENV);

    return conn;

}
