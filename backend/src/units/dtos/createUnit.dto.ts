import { IsString } from "class-validator";


export class CreateUnitDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}