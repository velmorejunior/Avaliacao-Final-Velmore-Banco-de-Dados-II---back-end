import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { Recado } from "../models/recado";

export class RecadosController {
  addRecados(request: Request, response: Response) {
    const { userID } = request.params;
    const { description, detail } = request.body;

    const user = usersDB.find((user) => user.id === userID);
    if (!user) {
      return response.status(404).json({ error: "usuario nao encontrado" });
    }

    try {
      user.addRecado(new Recado(description, detail));
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
    return response.json(user);
  }
}
