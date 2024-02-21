import { CategoryEntity } from "../entities/category.entity";


export class ReturnCategoryDto {
    id: number;
    name: string;
    description: string;

    constructor(category: CategoryEntity) {
        this.id = category.id;
        this.name = category.name;
        this.description = category.description;
    }
}