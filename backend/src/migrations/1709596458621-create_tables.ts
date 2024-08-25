import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1709596458621 implements MigrationInterface {
    name = 'CreateTables1709596458621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`CREATE TABLE "units" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "address" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"),
            CONSTRAINT "UQ_units_name" UNIQUE ("name")
        )`);

        await queryRunner.query(`CREATE TABLE "departments" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL UNIQUE,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "unit_name" character varying,
            CONSTRAINT "PK_4e2ca27f35e6aac0836a684321a" PRIMARY KEY ("id"),
            CONSTRAINT "FK_departments_unit" FOREIGN KEY ("unit_name") REFERENCES "units"("name") ON DELETE SET NULL
        )`);

        await queryRunner.query(`CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "username" character varying NOT NULL UNIQUE,
            "name" character varying NOT NULL,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "role" character varying NOT NULL,
            "phone_number" character varying NOT NULL,
            "unit_name" character varying,
            "department_name" character varying,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "settings" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "notifications_settings" character varying NOT NULL,
            "theme" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "username" character varying,
            CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "slas" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "description" character varying NOT NULL,
            "time" character varying NOT NULL,
            "response_time" integer NOT NULL,
            "resolution_time" integer NOT NULL,
            CONSTRAINT "PK_079580ac0c55a0adb2d54e6fb01" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "ticket_categories" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "description" character varying NOT NULL,
            CONSTRAINT "PK_6e0ee8248a3915067d3f4b64b10" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "tickets" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" character varying NOT NULL,
            "description" character varying NOT NULL,
            "priority" character varying NOT NULL,
            "status" character varying NOT NULL,
            "due_date" TIMESTAMP NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "category_id" uuid,
            "username" character varying,
            "technician_name" character varying,
            "unit_name" character varying,
            "sla_id" uuid,
            CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "feedback" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "rating" integer NOT NULL,
            "comment" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "username" character varying,
            "ticket_id" uuid,
            CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "ticket_changes" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "change_type" character varying NOT NULL,
            "old_value" character varying NOT NULL,
            "new_value" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "ticket_id" uuid,
            "username" character varying,
            CONSTRAINT "PK_60d2a3484ec85495d5414b64e6b" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "faqs" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "question" character varying NOT NULL,
            "answer" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "equipments" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "description" character varying NOT NULL,
            "serial_number" integer NOT NULL,
            "is_shared" boolean NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "unit_name" character varying,
            "department_name" character varying,
            "username" character varying,
            "ticket_id" uuid,
            CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "attachments" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "file_path" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "ticket_id" uuid,
            CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
        await queryRunner.query(`DROP TABLE "departments"`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
    }
}