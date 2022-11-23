import { RecadoEntity } from "../database/entities/recado.entity";
import { pgHelper } from "../database/pg-helper";
import { Recado } from "../models/recado";

export class Recadorepository {
  async getRecadoByUser(userId: string): Promise<Recado[]> {
    const manager = pgHelper.client.manager;

    const recadosEntities = await manager.find(RecadoEntity, {
      where: { userId },
    });

    return recadosEntities.map((e) =>
      Recado.create(e.id, e.description, e.detail)
    );
  }
}
