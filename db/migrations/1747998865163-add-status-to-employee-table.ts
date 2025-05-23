import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToEmployeeTable1747998865163 implements MigrationInterface {
    name = 'AddStatusToEmployeeTable1747998865163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
    }

}
