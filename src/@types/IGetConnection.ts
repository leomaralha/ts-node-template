export interface DatabaseAuthCredentials {
    database: string;
    host: string;
    password: string;
    uri: string;
}

export interface IGetConnection {
    getDbCredentials(companyName: string): Promise<DatabaseAuthCredentials>;
}