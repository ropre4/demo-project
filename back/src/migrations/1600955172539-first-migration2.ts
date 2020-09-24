import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration21600955172539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "director" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "director" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "director"`);
        await queryRunner.query(`DROP TABLE "director"`);
    }

}
