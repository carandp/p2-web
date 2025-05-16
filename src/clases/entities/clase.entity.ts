import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../../common/base.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Bono } from "src/bonos/entities/bono.entity";

@Entity()
export class Clase extends Base {
    @Column()
    nombre: string;
    
    @Column()
    codigo: string;

    @Column()
    creditos: number;

    @ManyToOne(() => Usuario, usuario => usuario.clases)
    @JoinColumn()
    usuario: Usuario;
    
    @OneToMany(() => Bono, bono => bono.clase, { nullable: true })
    bonos: Bono[];
}
