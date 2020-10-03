import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserBlock1601751404238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_block" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "PK_4ccc8015091b2f9054ce0e40db5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "restaurantOwnerId" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "restaurantOwnerId" SET DEFAULT 0`);
        await queryRunner.query(`DROP TABLE "user_block"`);
    }

}
