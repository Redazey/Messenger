interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
}

export const dbConfig: Record<string, DatabaseConfig> = {
  development: {
    username: 'backend',
    password: 'backend1!',
    database: 'work_db',
    host: 'backengPG',
    dialect: 'postgres',
  },
  test: {
    username: 'backend',
    password: 'backend1!',
    database: 'work_db',
    host: 'backengPG',
    dialect: 'postgres',
  },
  production: {
    username: 'backend',
    password: 'backend1!',
    database: 'work_db',
    host: 'backengPG',
    dialect: 'postgres',
  },
};
