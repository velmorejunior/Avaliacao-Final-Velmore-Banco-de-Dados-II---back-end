import express, { Request, Response } from "express";
import { RecadosController } from "./controllers/recados.controller";
import { UserController } from "./controllers/user.controller";
import cors from "cors";
import { pgHelper } from "./database/pg-helper";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (request: Request, response: Response) => {
  return response.send("OK");
});

app.post("/users", new UserController().create);
app.get("/users", new UserController().getAll);
app.get("user/:userID", new UserController().getById);
app.delete("user/:userID", new UserController().remove);
app.post("/user/:userID/recados", new RecadosController().addRecados);

pgHelper
  .connect()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => console.log("API RODANDO"));
  })
  .catch((err) => console.log(err));
