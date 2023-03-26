import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { __db__ } = global as any;

    if (__db__) {
        prisma = __db__;
    } else {
        prisma = new PrismaClient({
            log: [
                {
                    emit: "event",
                    level: "query",
                },
                "info",
                "warn",
                "error",
            ],
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prisma.$on("query", ({ query, duration }: { query: string, duration: number }) => {
            console.log(`\x1b[36mprisma:query\x1b[0m ${query}`);
            console.log(`Took: ${duration}ms`);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).__db__ = prisma;
    }

    prisma.$connect();
}

export default prisma;