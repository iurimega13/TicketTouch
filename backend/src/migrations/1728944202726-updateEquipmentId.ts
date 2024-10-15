import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEquipmentId1728944202726 implements MigrationInterface {
    name = 'UpdateEquipmentId1728944202726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "FK_096d02bca5721dd2b0dc32b8736"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "user_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "user_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "FK_e26bd3840dc5611b7852e0ae154" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "FK_e26bd3840dc5611b7852e0ae154"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "user_name" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "FK_096d02bca5721dd2b0dc32b8736" FOREIGN KEY ("user_name") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
