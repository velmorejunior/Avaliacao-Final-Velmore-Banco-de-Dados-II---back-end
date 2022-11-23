import { Request, Response } from "express";
import { User } from "../models/user";
import { usersDB } from "../db/users";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const user = new User(email, password);
    const repository = new UserRepository();
    await repository.saveUser(user);
    return response.json(user.toJson());
  }

  async getAll(request: Request, response: Response) {
    const data = usersDB.map((user) => {
      return {
        id: user.id,
        email: user.email,
        password: user.password,
        Recado: user.Recados,
      };
    });
    return response.json(data);
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;
    const repository = new UserRepository();
    const user = await repository.findByIDUser(id);
    if (!user) {
      return response.status(404).json({ error: "Usuario não encontrado" });
    }
    return response.status(200).json(user.toJson());
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;
    const repository = new UserRepository();
    try {
      await repository.removeUser(id);
      return response.status(200).json();
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { email, password } = request.body;

    const repository = new UserRepository();

    const user = await repository.findByIDUser(id);

    if (!user) {
      return response.status(404).json({ error: "Usuario não encontrado" });
    }

    try {
      user.updateInformation(email, password);
      await repository.updateUser(user);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json(user.toJson());
  }
}
