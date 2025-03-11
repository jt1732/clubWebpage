"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/db";
import { Prisma } from "@prisma/client";

export async function createPost( formData: FormData ) {
    try{
        await prisma.post.create({
            data: {
                title: (formData.get('postTitle') as string),
                slug: (formData.get('postTitle') as string).replace(/\s+/g,'-').toLowerCase(),
                content: formData.get('postDescription') as string,
                author: {
                    connect: {
                        email: "john@gmail.com"
                    }
                }
            }
        })
    } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){          
                if (error.code == '') {
                    console.log("blah blah blah")
                }
            }
        }
    
    revalidatePath('./')
}

export async function editPost (formData : FormData, id: string) {
    await prisma.post.update({
        where: { id },
        data: {
            title: (formData.get('postTitle') as string),
            slug: (formData.get('postTitle') as string).replace(/\s+/g,'-').toLowerCase(),
            content: formData.get('postDescription') as string,
        }
    })
    revalidatePath('./')
}

export async function deletePost (formData : FormData, id: string) {
    await prisma.post.delete({ where: { id }})
    revalidatePath('./')
}