import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUnitAndDepartments1728865890567 implements MigrationInterface {
    name = 'UpdateUnitAndDepartments1728865890567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "departments"
            ADD CONSTRAINT "UQ_8681da666ad9699d568b3e91064" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "units"
            ADD CONSTRAINT "UQ_cd34e4bfea359fa09d997a0b87d" UNIQUE ("name")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "units" DROP CONSTRAINT "UQ_cd34e4bfea359fa09d997a0b87d"
        `);
        await queryRunner.query(`
            ALTER TABLE "departments" DROP CONSTRAINT "UQ_8681da666ad9699d568b3e91064"
        `);
    }

}
