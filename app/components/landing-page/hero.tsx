import CreateLinkForm from "@/app/(pages)/criar/create-link-form"
import ProjectCard from "../commons/project-card"
import { TotalVisits } from "../commons/total-visits"
import UserCard from "../commons/user-card/user-card"
import Button from "../ui/button"
import TextInput from "../ui/text-input"

export default function Hero() {

    const projects = [
        {
            id: "1",
            projectName: "Projeto 1",
            projectDescription: "Uma breve descrição",
            projectUrl: "",
            imageUrl: "",
            linkId: "renato",
            clicks: 0
        }
    ]

    return (
        <div className="flex-col flex md:flex-row p-4 h-full">
            <div className=" w-full flex flex-col gap-2 mt-[35vh]">
                <h1 className="text-5xl font-bold text-white leading-[64px]">
                    Seus projetos e redes sociais em um único link
                </h1>
                <h2>
                    Crie sua própria página de projetos e compartilhe eles com o mundo
                    <br />
                    Acompanhe o engajamento com Analytics de cliques
                </h2>
                <div className="flex items-center gap-2 w-full mt-[10vh]">
                 <CreateLinkForm />
                </div>
            </div>
            <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
                <div className="relative">
                    <UserCard isOwner={false} profileId= "renatoalcantara2022@gmail.com" />
                    <div className="absolute  -bottom-[7%] left-6 md:-right-[45%]">
                        <TotalVisits totalVisits={1234}/>
                    </div>
                    <div className="mt-5 md:absolute md:top-[29%] md:-left-[45%] md:-z-10">
                        <ProjectCard
                            project={
                                projects[0]
                            }
                            imagePath="/project1.jpg"
                            isOwner={true}
                        />
                    </div>
                    <div className="mt-5 md:absolute md:top-[5%] md:-left-[55%] md:-z-10">
                        <ProjectCard
                            project={
                                projects[0]
                            }
                            imagePath="/project3.jpg"
                            isOwner={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}