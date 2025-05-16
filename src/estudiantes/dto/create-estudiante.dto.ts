import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEstudianteDto {

    @IsNumber()
    @IsNotEmpty()
    cedula: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    programa: string;

    @IsNumber()
    @IsNotEmpty()
    semestre: number;
}
