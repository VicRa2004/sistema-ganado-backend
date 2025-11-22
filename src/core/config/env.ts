const {
  JWT_SECRET: jwtSecret = "default_secret",
  JWT_EXPIRES_IN: jwtExpiresIn = "7d",
  CLOUDINARY_CLOUD_NAME: clCloudName = "",
  CLOUDINARY_API_KEY: clCloudApiKey = "",
  CLOUDINARY_API_SECRET: clCloudApiSecret = "",
  EMAIL_USER: emailUser = "",
  EMAIL_PASS: emailPass = "",
  FRONTEND_URL: frontendUrl = "http://localhost:5173/#",
  BREVO_API_KEY: brevo_api_key = "",
} = process.env;

export const vars = {
  jwtSecret,
  jwtExpiresIn,
  clCloudName,
  clCloudApiKey,
  clCloudApiSecret,
  emailUser,
  emailPass,
  frontendUrl,
  brevoApiKey: brevo_api_key,
};
