import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserUnitDepartmentRelation1727579402781 implements MigrationInterface {
    name = 'AddUserUnitDepartmentRelation1727579402781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "departments" DROP CONSTRAINT "FK_unit_department"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_4ea2b4a7b62565c2337efb77e4f"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_398f1b6cfb181217cf6269fd7b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "unit_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "department_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "unit_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "department_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "users_username_key"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "departments"
            ADD CONSTRAINT "FK_6cc34d2562b6e8902cd6c68bdb4" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_b94ecc6be926a5d23aa7791ec8a" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_0921d1972cf861d568f5271cd85" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_0921d1972cf861d568f5271cd85"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_b94ecc6be926a5d23aa7791ec8a"
        `);
        await queryRunner.query(`
            ALTER TABLE "departments" DROP CONSTRAINT "FK_6cc34d2562b6e8902cd6c68bdb4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "users_username_key" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "department_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "unit_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "department_name" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "unit_name" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_398f1b6cfb181217cf6269fd7b8" FOREIGN KEY ("department_name") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_4ea2b4a7b62565c2337efb77e4f" FOREIGN KEY ("unit_name") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "departments"
            ADD CONSTRAINT "FK_unit_department" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
