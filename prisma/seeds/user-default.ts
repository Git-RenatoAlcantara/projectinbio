import { PrismaClient, Social } from "@prisma/client"

const seedDefaultUser = async () => {
    const db = new PrismaClient()
    return await db.user.findMany()
}

const createDefaultUser = async () => {
    const db = new PrismaClient()
    return await db.user.create({
        data: {
            email: "renatoalcantara2022@gmail.com",
            profile: {
                create: {
                    name: "Renato Dev",
                    description: "Sou desenvolvedor com experiência em NodeJS / ReactJS",
                    profileImage: "ia_minha_foto_redonda.png",
                    totalVisits: 1234,
                    link: "#",
                    socialPage: {
                        create: [
                            {
                                name: "GITHUB",
                                link: "https://github.com/Git-RenatoAlcantara"
                            },
                            {
                                name: "LINKEDIN",
                                link: "https://www.linkedin.com/in/canalrenatoalcantara/"
                            },
                            {
                                name: "INSTAGRAM",
                                link: "https://www.instagram.com/renato.htech/"
                            },
                            {
                                name: "TWITTER",
                                link: "https://x.com/Renato_Here"
                            }
                        ]
                    },
                    CustomSocial: {
                        create: {
                            title: "Youtube",
                            url: "https://www.youtube.com/@CanalRenatoAlcantara"
                        }
                    }
                },
            }
        },
    })
}
createDefaultUser()
    .then(() => console.log("[log] default user created successfully!"))