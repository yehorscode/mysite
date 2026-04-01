import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
export default function Home() {
  const { theme } = useTheme()
  return (
    <div className="flex flex-col">
      <div className="bg-accent p-5 text-white">
        <h1 className="font-heading text-4xl">Hi i'm Yehor!</h1>
        <span>And this is my personal site</span>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="p-4">
        <span className="font-heading text-2xl">
          Projects that i'm proud of
        </span>
        <div className="my-5 grid grid-cols-2 gap-3">
          {[
            {
              name: "Blueprint",
              description:
                "A site that collects all of available addons for Create Mod and shows them in a sleek interface. Built with Spencer Frost, Timiliris and other contributors. Backend runs on Appwrite",
              image: "/projects/blueprint",
              link: "https://blueprint.yehor.pl.eu.org",
              repo: "https://github.com/blueprint-site/blueprint-create",
            },
            {
              name: "Sparkle ysws site",
              description:
                "This is a site made for an upcoming duo-ysws where two friends can learn a new skill from eachother and earn rewards while learning",
              image: "public/projects/sparkle",
              link: "https://sparkle.dino.icu",
              repo: "https://github.com/yehorscode/sparkle-ysws",
            },
          ].map((project) => (
            <div
              key={project.name}
              className="flex flex-col border-4 p-4 transition-all hover:scale-101"
            >
              <img
                src={project.image + "_" + theme + ".webp"}
                alt={project.name + " showcase image"}
              />
              <span className="mt-3 font-heading text-2xl">{project.name}</span>
              <span className="text-sm">{project.description}</span>
              <div className="mt-auto flex gap-5 font-medium">
                <a
                  href={project.link}
                  target="_blank"
                  className="pt-2 hover:text-lime-400 hover:underline"
                >
                  Visit
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  className="pt-2 hover:text-blue-400 hover:underline"
                >
                  Repo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
