import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUnitDepartmentRelation1634567890123 implements MigrationInterface {
    name = 'AddUnitDepartmentRelation1634567890123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" ADD "unit_id" uuid`);
        await queryRunner.query(`ALTER TABLE "departments" ADD CONSTRAINT "FK_unit_department" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP CONSTRAINT "FK_unit_department"`);
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "unit_id"`);
    }
}