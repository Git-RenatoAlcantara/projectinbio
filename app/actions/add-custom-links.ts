"use server"

import db from "@/prisma/prisma";
import { auth } from "../lib/auth";


type Link = {
    title: string;
    url: string;
}


export default async function addCustomLinks({
    profileId,
    link1,
    link2,
    link3,
}: {
    profileId: string;
    link1: Link;
    link2: Link;
    link3: Link;
}) {



    try {



        // Filtrar links válidos (com título e URL preenchidos)
        const validLinks = [link1, link2, link3]
            .filter((link) => link?.title && link?.url)
            .map((link) => ({
                profileId: profileId,
                title: link!.title,
                url: link!.url,
            }));

        // Verificar se há links válidos antes de tentar criar
        if (validLinks.length > 0) {
            await db.customSocial.createMany({
                data: validLinks,
            });
        }

        return true

    } catch (e) {
        console.error(e)
        return false
    }
}