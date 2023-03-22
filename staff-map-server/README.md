# staff-map-server


## Prisma Initialise

1. To create the DB and model run these two commands:

```shell
npx prisma db push

npx prisma generate
```

2. To seed the database run:

```shell
npx prisma db seed
```

This will create an admin user:

username: admin@example.com
password: Blink182

## Prisma Migrate

```shell
npx prisma migrate dev --name name_of_stuff
```
