import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Base } from "../../common/base.entity";
import { Estudiante } from "../../estudiantes/entities/estudiante.entity";
import { Resenia } from "../../resenias/entities/resenia.entity";

@Entity()
export class Actividade extends Base {
    @Column()
    titulo: string;

    @Column()
    fecha: string;

    @Column()
    cupoMaximo: number;

    @Column()
    estado: number;

    @ManyToMany(() => Estudiante, (estudiante) => estudiante.actividades)
    @JoinTable()
    estudiantes: Estudiante[];

    @OneToMany(() => Resenia, (resenia) => resenia.actividade)
    resenias: Resenia[];

}
