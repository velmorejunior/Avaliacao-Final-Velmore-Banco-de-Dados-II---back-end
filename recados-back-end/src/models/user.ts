import { Recado } from "./recado";
import crypto from "crypto";

export class User {
  private _id: string;
  get id() {
    return this._id;
  }

  private _email: string;
  get email() {
    return this._email;
  }

  private _password: string;
  get password() {
    return this._password;
  }

  private _Recados: Recado[] = [];
  get Recados(): Recado[] {
    return this._Recados;
  }

  constructor(email: string, password: string) {
    this._id = crypto.randomUUID();
    this._email = email;
    this._password = password;
  }

  static create(id: string, email: string, password: string): User {
    const user = new User(email, password);
    user._id = id;
    user._email = email;

    return user;
  }

  updateUser(email: string, password: string) {
    this._email = email;
    this._password = password;
  }

  addRecado(recado: Recado) {
    this._Recados.push(recado);
  }

  toJson() {
    return {
      email: this._email,
      password: this._password,
    };
  }

  updateInformation(email: string, password: string) {
    if (!email) throw new Error("email inválido");

    this._email = email;
    this._password = password;
  }
}

const scrap = new Recado("Despesa", "Pagar conta de Luz");
