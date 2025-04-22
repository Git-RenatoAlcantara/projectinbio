"use server"

import db from "@/prisma/prisma"
import { auth } from "../lib/auth"

export async function createLink(link: string) {
    const session = await auth()

    const email = session?.user?.email
    if (!email) {
        return false
    }

    const user = await db.user.findUnique({
        where: {
            email
        }
    })

    if (!user) return false

    try {
        await db.profile.create({
            data: {
                link,
                userId: user.id
            }
        })

        return true
    } catch (err) {
        console.error(err)
        return false
    }
}