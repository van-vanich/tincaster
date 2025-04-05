"use server";
import {db} from "~/server/db";
import {account} from "~/server/db/schema";
import {eq} from "drizzle-orm";

export async function getAllAccounts() {
    return db.select().from(account);
}

export async function getByIdAccounts(id: number) {
    return db.select().from(account).where(eq(account.id, id));
}