import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToEmployee1747903953005 implements MigrationInterface {
    name = 'AddRoleToEmployee1747903953005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_employee_role_enum" AS ENUM('UI', 'UX', 'DEVELOPER', 'HR')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_role" "public"."employee_employee_role_enum" NOT NULL DEFAULT 'DEVELOPER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_role"`);
        await queryRunner.query(`DROP TYPE "public"."employee_employee_role_enum"`);
    }

}
