const {
   BD_HOST: dbHost = "localhost",
   DB_USER: dbUser = "root",
   DB_DATABASE: dbDatabase = "campo_db",
   DB_PASSWORD: dbPassword = "television07",
   JWT_SECRET: jwtSecret = "default_secret",
   JWT_EXPIRES_IN: jwtExpiresIn = "7d",
   CLOUDINARY_CLOUD_NAME: clCloudName = "",
   CLOUDINARY_API_KEY: clCloudApiKey = "",
   CLOUDINARY_API_SECRET: clApiSecret = "",
} = process.env;

export const vars = {
   dbHost,
   dbUser,
   dbDatabase,
   dbPassword,
   jwtSecret,
   jwtExpiresIn,
   clCloudName,
   clCloudApiKey,
   clApiSecret,
};
