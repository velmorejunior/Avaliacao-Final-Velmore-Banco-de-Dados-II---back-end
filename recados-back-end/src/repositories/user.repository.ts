import { User } from "../models/user";
import { pgHelper } from "../database/pg-helper";
import { UserEntity } from "../database/entities/user.entity";
import { RecadoEntity } from "../database/entities/recado.entity";

export class UserRepository {
  async findUsers(): Promise<User[]> {
    const manager = pgHelper.client.manager;

    const usersEntities = await manager.find(UserEntity);

    return usersEntities.map((row) => {
      return User.create(row.id, row.email, row.password);
    });
  }

  async saveUser(user: User): Promise<void> {
    const manager = pgHelper.client.manager;

    const userEntity = manager.create(UserEntity, {
      id: user.id,
      email: user.email,
      password: user.password,
    });

    await manager.save(userEntity);
  }

  async findByIDUser(id: string): Promise<User | undefined> {
    const manager = pgHelper.client.manager;
    const userEntity = await manager.findOne(UserEntity, {
      where: { id },
    });
    if (!userEntity) return undefined;
    const user = User.create(
      userEntity.id,
      userEntity.email,
      userEntity.password
    );
    return user;
  }

  async removeUser(id: string): Promise<void> {
    const manager = pgHelper.client.manager;
    const userEntity = await manager.findOneBy(UserEntity, { id });
    if (!userEntity) throw Error("Usuario não encontrado");
    await manager.delete(UserEntity, { id });
  }

  async updateUser(user: User): Promise<void> {
    const manager = pgHelper.client.manager;

    const userEntity = await manager.findOne(UserEntity, {
      where: { id: user.id },
    });

    if (!userEntity) throw new Error("Usuário não encontrado");

    // atualiza os dados pessoais do growdever
    await manager.update(
      UserEntity,
      { id: user.id },
      {
        email: user.email,
        password: user.password,
      }
    );

    await manager.update(
      UserEntity,
      { id: userEntity.id },
      { email: userEntity.email }
    );
  }
}
