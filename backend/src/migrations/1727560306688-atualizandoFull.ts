import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizandoFull1727560306688 implements MigrationInterface {
    name = 'AtualizandoFull1727560306688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "departments" DROP CONSTRAINT "FK_departments_unit"
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
                RENAME COLUMN "username" TO "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback"
                RENAME COLUMN "username" TO "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket_changes"
                RENAME COLUMN "username" TO "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP COLUMN "technician_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP COLUMN "unit_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "unit_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "department_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD "user_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD "technician_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD "unit_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "unit_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "departament_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "user_name" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "units" DROP CONSTRAINT "UQ_units_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "departments" DROP CONSTRAINT "departments_name_key"
        `);
        await queryRunner.query(`
            ALTER TABLE "departments" DROP COLUMN "unit_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "departments"
            ADD "unit_name" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "unit_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "unit_name" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "department_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "department_name" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "settings" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ADD "user_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback"
            ADD "user_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket_changes" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket_changes"
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
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "departments"
            ADD CONSTRAINT "FK_9c0278796d010dd24eb512b0803" FOREIGN KEY ("unit_name") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_4ea2b4a7b62565c2337efb77e4f" FOREIGN KEY ("unit_name") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_398f1b6cfb181217cf6269fd7b8" FOREIGN KEY ("department_name") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ADD CONSTRAINT "FK_a2883eaa72b3b2e8c98e7446098" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD CONSTRAINT "FK_32a7f0e4e32a46a094b55f7c25c" FOREIGN KEY ("category_id") REFERENCES "ticket_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD CONSTRAINT "FK_2e445270177206a97921e461710" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD CONSTRAINT "FK_5c234be1dae50d536259a7dc8c3" FOREIGN KEY ("technician_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD CONSTRAINT "FK_3d0c67ec73177527aa3dc57bca2" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD CONSTRAINT "FK_53fa10000ce596805c4ac4ae85a" FOREIGN KEY ("sla_id") REFERENCES "slas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback"
            ADD CONSTRAINT "FK_121c67d42dd543cca0809f59901" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback"
            ADD CONSTRAINT "FK_1cbd1e0bf4de866240b20ce387d" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket_changes"
            ADD CONSTRAINT "FK_734c0fd42d1723e42d063da9318" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket_changes"
            ADD CONSTRAINT "FK_cf70ef6cbaf836b7d39db738cc0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "FK_482c1675c4703236cc8347db231" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "FK_3ac88cb36149c7ddad22c7a6862" FOREIGN KEY ("departament_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "FK_096d02bca5721dd2b0dc32b8736" FOREIGN KEY ("user_name") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "FK_55e57c176a32c12b1332e74cfd3" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "attachments"
            ADD CONSTRAINT "FK_73d871f247ffebda5dc3f0df8a4" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "attachments" DROP CONSTRAINT "FK_73d871f247ffebda5dc3f0df8a4"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "FK_55e57c176a32c12b1332e74cfd3"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "FK_096d02bca5721dd2b0dc32b8736"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "FK_3ac88cb36149c7ddad22c7a6862"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "FK_482c1675c4703236cc8347db231"
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket_changes" DROP CONSTRAINT "FK_cf70ef6cbaf836b7d39db738cc0"
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket_changes" DROP CONSTRAINT "FK_734c0fd42d1723e42d063da9318"
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback" DROP CONSTRAINT "FK_1cbd1e0bf4de866240b20ce387d"
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback" DROP CONSTRAINT "FK_121c67d42dd543cca0809f59901"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP CONSTRAINT "FK_53fa10000ce596805c4ac4ae85a"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP CONSTRAINT "FK_3d0c67ec73177527aa3dc57bca2"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP CONSTRAINT "FK_5c234be1dae50d536259a7dc8c3"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP CONSTRAINT "FK_2e445270177206a97921e461710"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP CONSTRAINT "FK_32a7f0e4e32a46a094b55f7c25c"
        `);
        await queryRunner.query(`
            ALTER TABLE "settings" DROP CONSTRAINT "FK_a2883eaa72b3b2e8c98e7446098"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_398f1b6cfb181217cf6269fd7b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_4ea2b4a7b62565c2337efb77e4f"
        `);
        await queryRunner.query(`
            ALTER TABLE "departments" DROP CONSTRAINT "FK_9c0278796d010dd24eb512b0803"
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
            ALTER TABLE "ticket_changes" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket_changes"
            ADD "user_id" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback"
            ADD "user_id" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "settings" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
            ADD "user_id" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "department_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "department_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "unit_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "unit_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "departments" DROP COLUMN "unit_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "departments"
            ADD "unit_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "departments"
            ADD CONSTRAINT "departments_name_key" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "units"
            ADD CONSTRAINT "UQ_units_name" UNIQUE ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "user_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "departament_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "unit_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP COLUMN "unit_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP COLUMN "technician_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "username" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "department_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "unit_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD "unit_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD "technician_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "tickets"
            ADD "username" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "ticket_changes"
                RENAME COLUMN "user_id" TO "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "feedback"
                RENAME COLUMN "user_id" TO "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "settings"
                RENAME COLUMN "user_id" TO "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "departments"
            ADD CONSTRAINT "FK_departments_unit" FOREIGN KEY ("unit_name") REFERENCES "units"("name") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

}
