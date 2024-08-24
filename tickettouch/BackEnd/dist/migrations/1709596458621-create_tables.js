"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1709596458621 = void 0;
class CreateTables1709596458621 {
    constructor() {
        this.name = 'CreateTables1709596458621';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "units" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departaments" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "unit_id" integer, CONSTRAINT "PK_4e2ca27f35e6aac0836a684321a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "registration" integer NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "phone_number" character varying NOT NULL, "unit_id" integer, "department_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_21d38fd8fe8ee2025b22797a271" UNIQUE ("registration"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "notifications_settings" character varying NOT NULL, "theme" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "slas" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "time" character varying NOT NULL, "response_time" integer NOT NULL, "resolution_time" integer NOT NULL, CONSTRAINT "PK_079580ac0c55a0adb2d54e6fb01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_6e0ee8248a3915067d3f4b64b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "priority" character varying NOT NULL, "status" character varying NOT NULL, "due_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer, "user_id" integer, "technician_id" integer, "unit_id" integer, "sla_id" integer, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feedback" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "ticket_id" integer, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_changes" ("id" SERIAL NOT NULL, "change_type" character varying NOT NULL, "old_value" character varying NOT NULL, "new_value" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "ticket_id" integer, "user_id" integer, CONSTRAINT "PK_60d2a3484ec85495d5414b64e6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying NOT NULL, "answer" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipments" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "serial_number" integer NOT NULL, "is_shared" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "unit_id" integer, "departament_id" integer, "user_id" integer, "ticket_id" integer, CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attachments" ("id" SERIAL NOT NULL, "file_path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "ticket_id" integer, CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "departaments" ADD CONSTRAINT "FK_fde5533bca84f6791fd8fdc6685" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b94ecc6be926a5d23aa7791ec8a" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0921d1972cf861d568f5271cd85" FOREIGN KEY ("department_id") REFERENCES "departaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "settings" ADD CONSTRAINT "FK_a2883eaa72b3b2e8c98e7446098" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_32a7f0e4e32a46a094b55f7c25c" FOREIGN KEY ("category_id") REFERENCES "ticket_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_2e445270177206a97921e461710" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_5c234be1dae50d536259a7dc8c3" FOREIGN KEY ("technician_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_3d0c67ec73177527aa3dc57bca2" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_53fa10000ce596805c4ac4ae85a" FOREIGN KEY ("sla_id") REFERENCES "slas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_121c67d42dd543cca0809f59901" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_1cbd1e0bf4de866240b20ce387d" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_changes" ADD CONSTRAINT "FK_734c0fd42d1723e42d063da9318" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_changes" ADD CONSTRAINT "FK_cf70ef6cbaf836b7d39db738cc0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments" ADD CONSTRAINT "FK_482c1675c4703236cc8347db231" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments" ADD CONSTRAINT "FK_3ac88cb36149c7ddad22c7a6862" FOREIGN KEY ("departament_id") REFERENCES "departaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments" ADD CONSTRAINT "FK_e26bd3840dc5611b7852e0ae154" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipments" ADD CONSTRAINT "FK_55e57c176a32c12b1332e74cfd3" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachments" ADD CONSTRAINT "FK_73d871f247ffebda5dc3f0df8a4" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_73d871f247ffebda5dc3f0df8a4"`);
        await queryRunner.query(`ALTER TABLE "equipments" DROP CONSTRAINT "FK_55e57c176a32c12b1332e74cfd3"`);
        await queryRunner.query(`ALTER TABLE "equipments" DROP CONSTRAINT "FK_e26bd3840dc5611b7852e0ae154"`);
        await queryRunner.query(`ALTER TABLE "equipments" DROP CONSTRAINT "FK_3ac88cb36149c7ddad22c7a6862"`);
        await queryRunner.query(`ALTER TABLE "equipments" DROP CONSTRAINT "FK_482c1675c4703236cc8347db231"`);
        await queryRunner.query(`ALTER TABLE "ticket_changes" DROP CONSTRAINT "FK_cf70ef6cbaf836b7d39db738cc0"`);
        await queryRunner.query(`ALTER TABLE "ticket_changes" DROP CONSTRAINT "FK_734c0fd42d1723e42d063da9318"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_1cbd1e0bf4de866240b20ce387d"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_121c67d42dd543cca0809f59901"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_53fa10000ce596805c4ac4ae85a"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_3d0c67ec73177527aa3dc57bca2"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_5c234be1dae50d536259a7dc8c3"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_2e445270177206a97921e461710"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_32a7f0e4e32a46a094b55f7c25c"`);
        await queryRunner.query(`ALTER TABLE "settings" DROP CONSTRAINT "FK_a2883eaa72b3b2e8c98e7446098"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0921d1972cf861d568f5271cd85"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b94ecc6be926a5d23aa7791ec8a"`);
        await queryRunner.query(`ALTER TABLE "departaments" DROP CONSTRAINT "FK_fde5533bca84f6791fd8fdc6685"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
        await queryRunner.query(`DROP TABLE "equipments"`);
        await queryRunner.query(`DROP TABLE "faqs"`);
        await queryRunner.query(`DROP TABLE "ticket_changes"`);
        await queryRunner.query(`DROP TABLE "feedback"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "ticket_categories"`);
        await queryRunner.query(`DROP TABLE "slas"`);
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "departaments"`);
        await queryRunner.query(`DROP TABLE "units"`);
    }
}
exports.CreateTables1709596458621 = CreateTables1709596458621;
//# sourceMappingURL=1709596458621-create_tables.js.map