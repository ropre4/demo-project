Express
Node
TypeORM
Postgres

To create a migration after modifying an entity: 

`npm run typeorm migration:generate -- -n [name]`

To run missing migrations: 

`npm run typeorm migration:run`