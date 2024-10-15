import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEquipmentEntity1728957018933 implements MigrationInterface {
    name = 'UpdateEquipmentEntity1728957018933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "updated_at"
        `);
    }

}
