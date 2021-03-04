import { Dialect } from "sequelize/types";

export interface DatabaseAuthCredentials {
    database: string;
    host: string;
    password: string;
    uri: string;
    dialect: Dialect;
}

export interface IGetConnection {
    getDbCredentials(hostName: string): Promise<DatabaseAuthCredentials>;
}