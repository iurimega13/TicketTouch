import { IsString } from "class-validator";


export class CreateUnitDto {
    @IsString()
    name: string;

    @IsString()
    address: string;
}