import { InferSelectModel } from "drizzle-orm";
import { project } from "@/db/schema";

export type Project = InferSelectModel<typeof project>;
