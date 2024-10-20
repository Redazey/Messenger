interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
}
export declare const dbConfig: Record<string, DatabaseConfig>;
export {};
