import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEmployeeAddressTable1747996536178 implements MigrationInterface {
    name = 'UpdateEmployeeAddressTable1747996536178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_f9d306b968b54923539b3936b03" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" date`);
        await queryRunner.query(`UPDATE "employee" SET "date_of_joining" = '2020-01-01' WHERE "date_of_joining" is NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer`);
        await queryRunner.query(`UPDATE "employee" SET "experience" = 5 WHERE "experience" is NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_f9d306b968b54923539b3936b03"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
    }

}
