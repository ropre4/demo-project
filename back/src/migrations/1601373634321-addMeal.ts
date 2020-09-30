import {MigrationInterface, QueryRunner} from "typeorm";

export class addMeal1601373634321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "meal" ("id" SERIAL NOT NULL, "restaurantId" integer NOT NULL, "ownerId" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "meal"`);
    }

}
