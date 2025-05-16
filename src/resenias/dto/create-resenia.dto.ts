import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReseniaDto {

    @IsString()
    @IsNotEmpty()
    comentario: string;

    @IsNumber()
    @IsNotEmpty()
    calificacion: number;

    @IsString()
    @IsNotEmpty()
    fecha: string;

    @IsNumber()
    @IsNotEmpty()
    estudiante: number;

    @IsNumber()
    @IsNotEmpty()
    actividade: number;

}
