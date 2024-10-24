import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEntities1729293502042 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Verificar se a restrição de chave estrangeira existe antes de removê-la
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_b94ecc6be926a5d23aa7791ec8a') THEN
                    ALTER TABLE "users" DROP CONSTRAINT "FK_b94ecc6be926a5d23aa7791ec8a";
                END IF;
            END
            $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_0921d1972cf861d568f5271cd85') THEN
                    ALTER TABLE "users" DROP CONSTRAINT "FK_0921d1972cf861d568f5271cd85";
                END IF;
            END
            $$;
        `);

        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "unit_id"
        `);

        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "department_id"
        `);

        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "unitId" uuid
        `);

        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "departmentId" uuid
        `);

        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_573707d34e5b3252f03b728b3f5" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_554d853741f2083faaa5794d2ae" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_554d853741f2083faaa5794d2ae"
        `);

        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_573707d34e5b3252f03b728b3f5"
        `);

        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "departmentId"
        `);

        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "unitId"
        `);

        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "department_id" uuid
        `);

        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "unit_id" uuid
        `);

        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_0921d1972cf861d568f5271cd85" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_b94ecc6be926a5d23aa7791ec8a" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }
}