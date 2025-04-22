"use server"

import db from "@/prisma/prisma"

export async function verifyLink(link: string) {

    const linkExist = await db.profile.findFirst({
        where: {
            link,
        }
    })

    return linkExist
}