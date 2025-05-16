import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBonoDto {
    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @IsNumber()
    @IsNotEmpty()
    calificacion: number;

    @IsString()
    @IsNotEmpty()
    palabraClave: string;
}
