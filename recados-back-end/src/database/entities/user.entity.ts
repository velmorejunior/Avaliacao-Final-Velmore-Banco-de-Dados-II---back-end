import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { RecadoEntity } from "./recado.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => RecadoEntity, (entity) => entity.userEntity)
  recadoEntity?: RecadoEntity;
}
