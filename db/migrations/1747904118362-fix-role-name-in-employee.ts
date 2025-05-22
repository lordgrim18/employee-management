import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRoleNameInEmployee1747904118362 implements MigrationInterface {
    name = 'FixRoleNameInEmployee1747904118362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "employee_role" TO "role"`);
        await queryRunner.query(`ALTER TYPE "public"."employee_employee_role_enum" RENAME TO "employee_role_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."employee_role_enum" RENAME TO "employee_employee_role_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "role" TO "employee_role"`);
    }

}
