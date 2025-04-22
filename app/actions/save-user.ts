"use server"

import { fileTypeFromBuffer } from "file-type";
import db from "@/prisma/prisma";

import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises"
import path from "path";

export async function saveUser(formData: FormData) {

    const profileId = formData.get("profileId") as string;
    const name = formData.get("yourName") as string;
    const imageFile = formData.get("imageFile") as File;
    const description = formData.get("description") as string;
    try {

        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const filename = Date.now() + "_" + profileId;
        const fileType = await fileTypeFromBuffer(buffer)
        const ext = fileType?.ext

        if (!existsSync(path.join(process.cwd(), `public/${profileId}/user`))) {
            await mkdir(path.join(process.cwd(), `public/${profileId}/user`), { recursive: true })
        }

        await writeFile(
            path.join(process.cwd(), `public/${profileId}/user/${filename}.${ext}`),
            buffer
        )

        await db.profile.update({
            where: {
                link: profileId,
            },
            data: {
                name,
                description,
                profileImage: `/${profileId}/user/${filename}.${fileType?.ext}`
            }
        })
    } catch (error) {
        console.log("Error occured ", error);
    }
}