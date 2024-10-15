import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEquipmentEntity1728950285424 implements MigrationInterface {
    name = 'UpdateEquipmentEntity1728950285424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "UQ_f4998754e0540f11071135fac36" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "UQ_f84861788a50fe73108a248ec37" UNIQUE ("serial_number")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "UQ_f84861788a50fe73108a248ec37"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "UQ_f4998754e0540f11071135fac36"
        `);
    }

}
