import app from "./app";

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    app.listen(PORT);
    console.log(`Sever on port: ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
