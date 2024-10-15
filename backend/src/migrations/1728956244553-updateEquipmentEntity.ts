import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEquipmentEntity1728956244553 implements MigrationInterface {
    name = 'UpdateEquipmentEntity1728956244553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "FK_3ac88cb36149c7ddad22c7a6862"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "FK_02af95fc91100bbd4967bd4bf61" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "FK_02af95fc91100bbd4967bd4bf61"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "FK_3ac88cb36149c7ddad22c7a6862" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
