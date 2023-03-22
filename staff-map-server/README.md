# staff-map-server

* DB: SqlLite 
* ORM: Prisma


## Prisma Initialise

1. To create the DB and generate the model, run these two commands:

```shell
npx prisma db push

npx prisma generate
```

2. To seed the database run:

```shell
npx prisma db seed
```

The DB seed script is located at: ```.\prisma\seed.ts```

This will create two users:

1. Bob
   * username: ```bob@example.com```
   * password: ```password```
   * role: ```User```

2. Alice
   * username: ```alice@example.com```
   * password: ```jspkvo0sD```
   * role: ```Admin```

## Prisma Migrate

```shell
npx prisma migrate dev --name name_of_stuff
```
