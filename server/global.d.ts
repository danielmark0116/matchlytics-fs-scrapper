declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: string;
    FORCE_COLOR?: string;

    POSTGRES_PORT?: string;
    POSTGRES_USER?: string;
    POSTGRES_PASSWORD?: string;

    SERVER_PORT?: string;

    MODE?: string;

    JWT_SECRET?: string;

    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    GOOGLE_CALLBACK_URL?: string;

    MONGO_INITDB_ROOT_USERNAME?: string;
    MONGO_INITDB_ROOT_PASSWORD?: string;
    MONGO_INITDB_ROOT_DATABASE?: string;

    SUPER_ADMIN_EMAIL?: string;
    SUPER_ADMIN_PASSWORD?: string;

    SALT_ROUNDS?: string;
  }
}
