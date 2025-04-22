import "server-only"
import { auth } from "../lib/auth"
import db from "@/prisma/prisma"


export async function getProfileData(profileId: string) {

    return await db.profile.findFirst({
        where: {
            OR: [
                {
                    link: profileId
                },
                {
                    User: {
                        is: {
                            email: profileId
                        }
                    }
                }
            ]
        },
        include: {
            User: true,
            project: true,
            CustomSocial: true,
            socialPage: true
        }
    })

}

export async function getUserProfile(email: string) {
    const profile = await db.profile.findFirst({
        where: {
            User: {
                is: {
                    email
                }
            }
        },
    })

    if (!profile) return

    return profile ?? null
}


export async function getUserCustomSocial(email: string) {

    const customSocialLinks = await db.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
            where: {
                email
            },
            include: {
                profile: true
            }
        });

        if (!user || !user?.profile.length) return

        const profileId = user.profile.pop()

        if (!profileId) return

        const customSocialLinks = tx.customSocial.findMany({
            where: {
                profileId: profileId.link
            }
        })

        return customSocialLinks
    })

    return customSocialLinks
}

export async function getUserSocialLinks(email: string) {

    const user = await db.user.findUnique({
        where: {
            email
        },
        include: {
            profile: true
        }
    })


    const profile = user?.profile

    const socialPages = await db.socialPage.findMany({
        where: {
            profileId: profile?.[0].link
        }
    })

    return socialPages
}


export async function getProfileProjects(profileId: string) {
    return await db.project.findMany({
        where: {
            linkId: profileId
        }
    })
}

export async function getProfileId(email: string) {
    const profile = await db.profile.findFirst({
        where: {
            User: {
                is: {
                    email
                }
            }
        },
    })

    return profile?.link
}