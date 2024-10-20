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
    database: 'stud_db',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'backend',
    password: 'backend1!',
    database: 'stud_db',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'backend',
    password: 'backend1!',
    database: 'stud_db',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
