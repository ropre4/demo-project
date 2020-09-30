import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrderTables1601498308019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "created" integer NOT NULL, "creatorId" integer NOT NULL, "creatorName" character varying NOT NULL, "restaurantId" integer NOT NULL, "restaurantName" character varying NOT NULL, "lastUpdate" integer NOT NULL, "status" integer NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_line" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "amount" integer NOT NULL, "price" integer NOT NULL, "mealId" integer NOT NULL, "mealName" character varying NOT NULL, CONSTRAINT "PK_01a7c973d9f30479647e44f9892" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_status_history" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "userId" integer NOT NULL, "newStatus" integer NOT NULL, "created" integer NOT NULL, CONSTRAINT "PK_e6c66d853f155531985fc4f6ec8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "order_status_history"`);
        await queryRunner.query(`DROP TABLE "order_line"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
