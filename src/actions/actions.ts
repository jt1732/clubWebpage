"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/db";
import { Prisma } from "@prisma/client";


export async function createClubApplication(formData: FormData) {
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
}
