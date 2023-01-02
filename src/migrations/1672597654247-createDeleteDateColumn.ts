import { MigrationInterface, QueryRunner } from "typeorm";

export class createDeleteDateColumn1672597654247 implements MigrationInterface {
    name = 'createDeleteDateColumn1672597654247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
