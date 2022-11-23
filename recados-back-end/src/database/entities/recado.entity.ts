import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "recados" })
export class RecadoEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  description!: string;

  @Column()
  detail!: string;

  @Column({ name: "id_user" })
  userId!: string;

  @ManyToOne(() => RecadoEntity)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  userEntity?: UserEntity;
}
