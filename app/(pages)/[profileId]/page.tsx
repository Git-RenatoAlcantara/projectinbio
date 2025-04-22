import ProjectCard from "@/app/components/commons/project-card";
import { TotalVisits } from "@/app/components/commons/total-visits";
import UserCard from "@/app/components/commons/user-card/user-card";
import { auth } from "@/app/lib/auth";
import { getProfileData, getProfileProjects } from "@/app/server/get-profile";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewProject from "./new-project";
import { increaseProfileVisits } from "@/app/actions/increase-profile-visits";
import { trackServerEvent } from "@/app/lib/mixpanel";

export default async function ProfilePage({
    params
}: {
    params: Promise<{ profileId: string }>;
}) {

    const { profileId } = await params;

    const profileData = await getProfileData(profileId);

    if (!profileData) return notFound();

    trackServerEvent("page_view", {
        page: "profile"
    })

    console.log(profileData)
    const projects = await getProfileProjects(profileId);

    const session = await auth();

    const isOwner = profileData.User.email === session?.user?.email

    if (!isOwner) {
        await increaseProfileVisits(profileId);
    }

    return (
        <div className="relative h-screen flex p-20 overflow-hidden">
            {/* <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
                <span>Você está usando a versão trial.</span>
                <Link href={`/${profileId}/upgrade`}>
                    <button className="text-accent-green font-bold">
                        Faça o upgrade agora!
                    </button>
                </Link>
            </div> */}
            <div className="w-1/2 flex justify-center h-min">
                <UserCard profileId={profileId}  isOwner />
            </div>
            <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
                {profileData.project.length > 0 && (
                    <>
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                imagePath={project.imageUrl}
                                isOwner={isOwner}
                            />
                        ))}
                    </>
                )}
                {isOwner && (
                    <NewProject profileId={profileId} />
                )}
            </div>
            {isOwner && (
                <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
                    <TotalVisits totalVisits={profileData.totalVisits} />
                </div>
            )}
        </div>
    )
}