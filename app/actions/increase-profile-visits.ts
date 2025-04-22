"use server"

import db from "@/prisma/prisma"
/*
[reference]
https://www.prisma.io/docs/orm/prisma-client/queries/transactions
*/

export async function increaseProfileVisits(profileId: string) {
    try {
        db.$transaction([
            db.profile.update({
                where: {
                    link: profileId
                },
                data: {
                    totalVisits: {
                        increment: 1
                    }
                }
            })
        ]);

        return true
    } catch (err) {
        console.error(err)
        return false
    }
}