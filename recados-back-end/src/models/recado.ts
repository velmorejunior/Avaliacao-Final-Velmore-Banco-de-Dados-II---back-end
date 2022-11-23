import crypto from "crypto";

export class Recado {
  private _id: string;
  private _description: string;
  private _detail: string;

  constructor(description: string, detail: string) {
    if (!description) throw new Error("inserir uma descrição");
    if (!detail) throw new Error("inserir uma detalhamento");
    this._id = crypto.randomUUID();
    this._description = description;
    this._detail = detail;
  }

  static create(id: string, description: string, detail: string): Recado {
    const model = new Recado(description, detail);
    model._id = id;
    return model;
  }

  get id() {
    return this._id;
  }

  get description() {
    return this._description;
  }

  get detail() {
    return this._detail;
  }

  updateRecado(description: string, detail: string) {
    this._description = description;
    this._detail = detail;
  }
}
