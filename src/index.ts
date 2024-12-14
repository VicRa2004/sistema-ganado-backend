import app from "./app";
import { sequelize } from "./config/db";

const PORT = process.env.PORT || 3000;

async function main() {
   try {
      await sequelize.sync();
      console.log("Connection has been established successfully.");
      app.listen(PORT);
      console.log("Server on port", PORT);
   } catch (error) {
      console.error("Unable to connect to the database:", error);
   }
}

main();
