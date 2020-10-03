import {MigrationInterface, QueryRunner} from "typeorm";

export class bigIntForTimestamps1601568756425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "created" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "lastUpdate"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "lastUpdate" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_status_history" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "order_status_history" ADD "created" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order_status_history" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "order_status_history" ADD "created" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "lastUpdate"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "lastUpdate" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "created" integer NOT NULL`);
    }

}
