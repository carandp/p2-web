import { Entity } from "typeorm/decorator/entity/Entity";
import { Base } from "../../common/base.entity";
import { Column, ManyToMany, OneToMany } from "typeorm";
import { Actividade } from "../../actividades/entities/actividade.entity";
import { Resenia } from "../../resenias/entities/resenia.entity";

@Entity()
export class Estudiante extends Base {
    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    programa: string;

    @Column()
    semestre: number;

    @ManyToMany(() => Actividade, (actividade) => actividade.estudiantes)
    actividades: Actividade[];

    @OneToMany(() => Resenia, (resenia) => resenia.estudiante)
    resenias: Resenia[];
}
