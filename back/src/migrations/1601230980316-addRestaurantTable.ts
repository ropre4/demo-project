import {MigrationInterface, QueryRunner} from "typeorm";

export class addRestaurantTable1601230980316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" SERIAL NOT NULL, "ownerId" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "cuisineType" integer NOT NULL, CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "restaurant"`);
    }

}
