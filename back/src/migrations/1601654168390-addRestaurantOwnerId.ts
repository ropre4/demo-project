import {MigrationInterface, QueryRunner} from "typeorm";

export class addRestaurantOwnerId1601654168390 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" ADD "restaurantOwnerId" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "restaurantOwnerId"`);
    }

}
