"use server";

import db from "@/prisma/prisma";
import { auth } from "../lib/auth";
import { Social } from "@prisma/client";

type SocialType = {
    name: Social;
    link: string;
}

export async function createSocialLinks({
    profileId,
    github,
    instagram,
    linkedin,
    twitter
}: {
    profileId: string;
    github: string;
    instagram: string;
    linkedin: string;
    twitter: string;
}) {

    try {

        const socialLinks: SocialType[] = [
            github ? { name: Social["GITHUB"], link: github } : null,
            linkedin ? { name: Social["LINKEDIN"], link: linkedin } : null,
            instagram ? { name: Social["INSTAGRAM"], link: instagram } : null,
            twitter ? { name: Social["TWITTER"], link: twitter } : null,
        ].filter((social): social is SocialType => social !== null); // Remove valores nulos ou undefined


        if (socialLinks.length > 0) {
            await db.profile.update({
                where: { link: profileId },
                data: {
                    socialPage: {
                        createMany: {
                            data: socialLinks.map(social => ({ name: social.name, link: social.link}))
                        },
                    },
                },
            });
        }

        return true;

    } catch (e) {
        console.error(e)
        return false
    }
}