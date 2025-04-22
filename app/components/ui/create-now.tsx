import { useState } from "react";
import TextInput from "./text-input";
import Button from "./button";
import { manageAuth } from "@/app/actions/manage-auth";
import { signIn } from "@/app/lib/auth";

export default function CreateNow() {
    const [link, setLink] = useState("");

    return (
        <div className="flex items-center gap-2 w-full mt-[10vh]">
            <span className="text-white text-xl">projectinbio.com</span>
            <TextInput
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Seu link" />
            <Button
                onClick={() => {
                    signIn("github", {
                        redirectTo: `/criar?link=${link}`
                    })
                }}>Criar agora</Button>
            <form action={manageAuth}>

            </form>
        </div>

    )
}