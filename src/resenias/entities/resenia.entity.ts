import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../../common/base.entity";
import { Estudiante } from "../../estudiantes/entities/estudiante.entity";
import { Actividade } from "../../actividades/entities/actividade.entity";

@Entity()
export class Resenia extends Base {
    @Column()
    comentario: string;

    @Column()
    calificacion: number;

    @Column()
    fecha: string;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.resenias)
    @JoinColumn()
    estudiante: Estudiante;

    @ManyToOne(() => Actividade, (actividade) => actividade.resenias)
    @JoinColumn()
    actividade: Actividade;
}
