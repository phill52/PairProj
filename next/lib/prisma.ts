import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaMariaDb({
	host: "localhost",
	port: 3306,
	connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export default prisma;
