import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import Button from "../../ui/button";
import EditSocialLinks from "./edit-social-link";
import AddCustomLink from "./add-custom-link";
import { getProfileData, getUserCustomSocial, getUserSocialLinks } from "@/app/server/get-profile";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { formatUrl } from "@/app/lib/utils";
import EditUserCard from "./edit-user-card";
import Router from "next/navigation";
export default async function UserCard({
    profileId,
    isOwner,
}: {
    profileId?: string;
    isOwner: boolean;
}) {
    const session = await auth()    

    const profile = await getProfileData(profileId || "")


    const socialPages = profile?.socialPage ?? []
    const customSocialLinks = profile?.CustomSocial ?? []


    return (
        <div className="md:w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
            <div className="size-48">
                <img
                    className="rounded-full object-cover w-full h-full"
                    src={profile?.profileImage || "avatar.png"}
                    alt={`${profile?.name}`}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
                        {profile?.name || "Seu nome"}
                    </h3>
                    {isOwner && <EditUserCard />}
                </div>
                <p className="opacity-40">
                    {profile?.description || "Sua descrição"}
                </p>
                <div className="flex flex-col gap-2 w-full">
                    <span className="uppercase text-xs font-medium">Links</span>
                    <div className="flex gap-3">
                        {
                            socialPages.map((page: { name: string, link: string | null }, index: number) => (
                                <Link href={formatUrl(page?.link || "")} target="_blank">
                                    <button key={index} className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
                                        {page.name === "GITHUB" && <Github />}
                                        {page.name === "INSTAGRAM" && <Instagram />}
                                        {page.name === "LINKEDIN" && <Linkedin />}
                                        {page.name === "TWITTER" && <Twitter />}
                                    </button>
                                </Link>
                            ))
                        }
                        {isOwner && <EditSocialLinks />}
                    </div>
                    <div className="flex flex-col gap-3 w-full min-h-[172px]">
                        <div className="w-full flex flex-col items-center gap-3">
                            {
                                customSocialLinks?.map(social => (
                                    <Link
                                        className="w-full"
                                        href={formatUrl(social?.url || "")}
                                        target="_blank">
                                        <Button className="w-full">{social?.title}</Button>
                                    </Link>
                                ))
                            }
                            {isOwner && <AddCustomLink />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // return (
    //     <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
    //         <div className="size-48">
    //             {isPreview ? (
    //                 <img
    //                     className="rounded-full object-cover w-full h-full"
    //                     src="ia_minha_foto_redonda.png"
    //                     alt={`${profile?.name}`}
    //                 />
    //             ) : (
    //                 <img
    //                     className="rounded-full object-cover w-full h-full"
    //                     src={profile?.profileImage || "avatar.png"}
    //                     alt={`${profile?.name}`}
    //                 />
    //             )}
    //         </div>
    //         <div className="flex flex-col gap-2 w-full">
    //             <div className="flex items-center gap-2">
    //                 <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
    //                     {isPreview ? (
    //                         "Renato Dev"
    //                     ) : (
    //                         <>
    //                             {profile?.name || "Seu nome"}
    //                         </>
    //                     )}
    //                 </h3>
    //                 {isOwner && <EditUserCard />}
    //             </div>
    //             <p className="opacity-40">
    //                 {isPreview ? (
    //                     "Desenvolvedor web com ênfase em backend."
    //                 ) : (
    //                     <>
    //                         {profile?.description || "Sua descrição"}
    //                     </>
    //                 )}
    //             </p>
    //             <div className="flex flex-col gap-2 w-full">
    //                 <span className="uppercase text-xs font-medium">Links</span>
    //                 <div className="flex gap-3">
    //                     {
    //                         renderSociaPages()
    //                     }

    //                     {isOwner && <EditSocialLinks />}
    //                 </div>
    //                 <div className="flex flex-col gap-3 w-full min-h-[172px]">
    //                     <div className="w-full flex flex-col items-center gap-3">
    //                         {renderCustomSocialPages()}
    //                         {/* <Button className="w-full">Template SaaS - Compre Agora</Button> */}
    //                         {isOwner && <AddCustomLink />}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}