import dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";
import usuarioRoutes from "./src/routes/usuario.routes.js";

const Port = process.env.PORT || 5000;

app.use("/usuarios", usuarioRoutes);

app.listen(Port, () => {
  console.log(`Servidor rodando no http://localhost:${Port}`);
});