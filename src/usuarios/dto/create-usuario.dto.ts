import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Rol } from "../../common/rol.enum";

export class CreateUsuarioDto {
    @IsNumber()
    @IsNotEmpty()
    cedula: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    grupoInvestigacion: string;

    @IsNumber()
    @IsNotEmpty()
    numExtension: number;

    @IsEnum(Rol)
    @IsNotEmpty()
    rol: Rol;
}
