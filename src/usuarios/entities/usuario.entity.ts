import { Rol } from '../../common/rol.enum';
import { Base } from '../../common/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Bono } from '../../bonos/entities/bono.entity';
import { Clase } from '../../clases/entities/clase.entity';

@Entity()
export class Usuario extends Base {
    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    grupoInvestigacion: string;

    @Column()
    numExtension: number;

    @Column()
    rol: Rol;
    
    @OneToOne(() => Usuario, { nullable: true })
    @JoinColumn()
    jefe: Usuario;

    @OneToMany(() => Bono, bono => bono.usuario, { nullable: true })
    bonos: Bono[];

    @OneToMany(() => Clase, clase => clase.usuario, { nullable: true })
    clases: Clase[];
}
