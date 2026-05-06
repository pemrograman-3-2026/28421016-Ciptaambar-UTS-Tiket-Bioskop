import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "@prisma/client"

const adapter = new PrismaMariaDb({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_tiket_bioskop"
})

export const prisma = new PrismaClient({ adapter })