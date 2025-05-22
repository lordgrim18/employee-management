import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordFieldToEmployee1747887726303 implements MigrationInterface {
    name = 'AddPasswordFieldToEmployee1747887726303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`UPDATE "employee" SET "password" = 'password' WHERE "password" is NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
