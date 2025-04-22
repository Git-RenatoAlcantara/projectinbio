"use client"

import { increaseProjectVisits } from "@/app/actions/increase-project-visits";
import { formatUrl } from "@/app/lib/utils";
import { Profile } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectCard({
    project,
    imagePath,
    isOwner
}: {
    project?: {
        id: string;
        imageUrl: string;
        projectName: string;
        projectDescription: string;
        projectUrl: string;
        linkId: string | null;
        clicks: number;
    },
    imagePath: string,
    isOwner: boolean
}) {
    const { profileId } = useParams()

    const formattedUrl = formatUrl(project?.projectUrl || "");

    async function handleClick() {
        if (!profileId || !project?.id) return;

        await increaseProjectVisits(project.id)
    }


    return (
        <Link href={formattedUrl} target="_blank" onClick={handleClick}>
            <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border-transparent hover:border-border-secondary">
                <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
                    <img src={imagePath} alt="Projeto" className="w-full  h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                    {isOwner  && (
                        <span className="uppercase text-xs font-bold text-accent-green">
                            {project?.clicks} Cliques
                        </span>
                    )}
                    <div className="flex flex-col">
                        <span className="text-white font-bold">{project?.projectName}</span>
                        <span className="text-content-body text-sm">
                            {project?.projectDescription}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}