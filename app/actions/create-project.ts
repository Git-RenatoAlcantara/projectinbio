"use server";


import db from "@/prisma/prisma";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function createProject(formData: FormData) {

    const profileId = formData.get("profileId") as string;
    const projectName = formData.get("projectName") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const projectUrl = formData.get("projectUrl") as string;
    const file = formData.get("file") as File;

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + profileId;

    try {

        if (!existsSync(path.join(process.cwd(), `public/${profileId}`))) {
            await mkdir(path.join(process.cwd(), `public/${profileId}`), { recursive: true });
        }

        await writeFile(
            path.join(process.cwd(), `public/${profileId}/${filename}.png`),
            buffer
        );


        await db.profile.update({
            where: {
                link: profileId,
            },
            data: {
                project: {
                    create: {
                        projectName: projectName,
                        projectDescription: projectDescription,
                        projectUrl: projectUrl,
                        imageUrl: `/${profileId}/${filename}.png`
                    }
                }
            }
        })


    } catch (error) {
        console.log("Error occured ", error);
    }
}