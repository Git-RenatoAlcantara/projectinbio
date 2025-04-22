import { auth } from "@/app/lib/auth";
import Button from "../ui/button";
import { manageAuth } from "@/app/actions/manage-auth";
import { Github } from "lucide-react"
import { getProfileData, getUserProfile } from "@/app/server/get-profile";
import Link from "next/link";
import { Jaro } from "next/font/google";

const jaroFont = Jaro({
    subsets: ["latin"],
    weight: ["400"]
})


export default async function Header() {

    const session = await auth()
    const profile = await getUserProfile(session?.user?.email || "")


    return (
        <div className="flex-col  absolute top-0 left-0 right-0 gap-2 md:flex-row md:max-w-7xl mx-auto  flex items-center justify-between p-10">
            <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="RenatoDev Logo" />
                <h3 className="text-white text-2xl font-bold">RenatoDev</h3>
            </div>
            <div className="flex items-center gap-4">
                {session && (
                    <Link href={`${profile?.link}`}>
                        <Button>Minha Página</Button>
                    </Link>
                )}
                <form action={manageAuth}>
                    {session ? <BtnGithubLogout /> : <BtnGithub />}
                </form>
            </div>
        </div>
    )
}

function BtnGithub() {
    return (
        <Button className="flex gap-1">< Github /> Login</Button>
    )
}

function BtnGithubLogout() {
    return (
        <Button>Sair</Button>
    )
}