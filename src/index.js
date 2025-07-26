import app from "./app.js";
import { sequelize } from "./config/database.js";
import config from "./config/config.js";


const PORT = config.PORT;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a postgreSQL");

    await sequelize.sync({ force: false }); // Cambiar a true si se desea reiniciar la base de datos

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};
startServer();
