import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL as string;
if (!connectionString) {
	throw new Error("DATABASE_URL is not defined");
}

const url = new URL(connectionString);

const adapterConfig: any = {
	host: url.hostname,
	port: parseInt(url.port) || 3306,
	user: url.username,
	password: url.password,
	database: url.pathname.slice(1),
	connectionLimit: 10,
};

if (process.env.APP_ENV === "prod") {
	adapterConfig.ssl = true;
}

const adapter = new PrismaMariaDb(adapterConfig);

const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter,
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
