export default function FAQ() {
    const faqItems = [
        {
            title: "Como funciona a criação de portfólio e links com Project in Bio",
            description: "Com Project in Bio, você pode criar um portfólio profissional e uma página de links em poucos minutos. Nossa plataforma oferece templates personalizáveis e uma interface fácil de usar para que você possa mostrar seu trabalho e organizar seu links de maneira eficiente."
        },
        {
            title: "Há um periodo de teste gratuito?",
            description: "Sim! Oferecemos um teste gratuito de 7 dias, sem compromisso. Isso permite que você explore todas as funcionalidades da nossa plataforma antes de decidir por uma assinatura."
        },
        {
            title: "Posso personalizar o design do meu portfólio?",
            description: "Sim! Com Project in Bio, você pode personalizar cores, fontes e layout do seu portfólio, garntindo que ele reflita a sua marca pessoal."
        },
        {
            title: "Preciso de habilidades técnicas para usar a plataforma?",
            description: "Não! Nossa plataforma foi desenvolvida para ser simples e intuitiva, então não é necessário conhecimento técnico. Você pode criar e personalizar su portfólio e links sem complicações."
        },
        {
            title: "O que acontece se eu cancelar minha assinatura?",
            description: "Você pode cancelar sua assinatura a qualquer momneto. Seu portfólio e página de links ficarão disponiveis até o final do período pago, mas após isso, as funcionalidades premium serão desativdas."
        },
        {
            title: "Posso compartilhar meu portfólio em redes sociais?",
            description: "Sim! Você pode facilmente compartilhar seu portfólio e página de links em suas redes sociais atravéis de um link personalizado."
        }
    ]

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-4xl my-5 font-bold text-white">Dúvidas frequentes</h3>
            <div className="flex gap-3 my-10">
                <div className="flex flex-col gap-3">
                    {faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item) => (
                        <FAQItem key={item.title} title={item.title} description={item.description} />
                    ))}
                </div>
                <div className="flex flex-col gap-3">
                    {faqItems.slice(Math.ceil(faqItems.length / 2)).map((item) => (
                        <FAQItem key={item.title} title={item.title} description={item.description} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function FAQItem({
    title,
    description
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="w-[351px] h-min flex flex-col gap-3 p-5 rounded-2xl border border-border-primary bg-background-primary">
            <p className="font-bold text-white">{title}</p>
            <p className="text-content-body">{description}</p>
        </div>
    )
}