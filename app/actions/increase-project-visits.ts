"use server"

import db from "@/prisma/prisma"
/*
[reference]
https://www.prisma.io/docs/orm/prisma-client/queries/transactions
*/

export async function increaseProjectVisits(projectId: string) {
    try {
        await db.project.update({
            where: {
                id: projectId
            },
            data: {
                clicks: {
                    increment: 1
                }
            }
        });

        return true
    } catch (err) {
        console.error(err)
        return false
    }
}