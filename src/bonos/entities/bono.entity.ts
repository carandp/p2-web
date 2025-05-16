import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../../common/base.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Clase } from "../../clases/entities/clase.entity";

@Entity()
export class Bono extends Base {
    @Column()
    monto: number;

    @Column()
    calificacion: number;

    @Column()
    palabraClave: string;

    @ManyToOne(() => Usuario, usuario => usuario.bonos)
    @JoinColumn()
    usuario: Usuario;

    @ManyToOne(() => Clase, clase => clase.bonos)
    @JoinColumn()
    clase: Clase;

}
