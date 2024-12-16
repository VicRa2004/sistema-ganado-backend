const {
   BD_HOST: dbHost = "localhost",
   DB_USER: dbUser = "root",
   DB_DATABASE: dbDatabase = "campo_db",
   DB_PASSWORD: dbPassword = "television07",
   JWT_SECRET: jwtSecret = "default_secret",
   JWT_EXPIRES_IN: jwtExpiresIn = "7d",
   CLOUDINARY_CLOUD_NAME,
   CLOUDINARY_API_KEY,
   CLOUDINARY_API_SECRET,
} = process.env;

export const vars = {
   dbHost,
   dbUser,
   dbDatabase,
};
