import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
import HomeHackatimeStats from "./components/HomeHackatimeStats"
export default function Home() {
  const { theme } = useTheme()
  return (
    <div className="flex flex-col">
      <div className="bg-accent p-4 text-white">
        <h1 className="font-heading text-4xl font-extrabold">Hi i'm Yehor!</h1>
        <span>And this is my personal site</span>
      </div>

      <Separator orientation="horizontal" className="my-6" />
      <div className="px-4">
        <span className="font-heading text-2xl font-medium">
          Projects that i'm proud of
        </span>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
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
              image: "/projects/sparkle",
              link: "https://sparkle.dino.icu",
              repo: "https://github.com/yehorscode/sparkle-ysws",
            },
            {
              name: "RssTUI",
              description:
                "App made in Python and Textual that can parse Rss feeds into a sleek tui interface",
              image: "/projects/rsstui",
              link: "https://pypi.org/project/rsstui/",
              repo: "https://github.com/yehorscode/RssTUI",
            },
            {
              name: "More of my projects?",
              description:
                "Visit my GitHub and see more of my repos (spoiler: most aren't too good)",
              image: "/projects/github",
              link: "https://github.com/yehorscode",
              repo: "https://github.com/yehorscode",
            },
          ].map((project) => (
            <div
              key={project.name}
              className="flex flex-col border-4 p-4 transition-all hover:scale-101"
            >
              <img
                src={project.image + "_" + theme + ".webp"}
                alt={project.name + " showcase image"}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              <span className="mt-3 font-heading text-2xl font-medium">
                {project.name}
              </span>
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
      <Separator orientation="horizontal" className="my-6" />
      <div className="flex flex-col px-4">
        <span className="font-heading text-2xl">My hackatime stats</span>
        <span className="opacity-80">
          Hackatime is Hack Club's alternative to Wakatime
        </span>
        <HomeHackatimeStats />
      </div>
      <Separator orientation="horizontal" className="my-6" />
      <div className="align-center flex flex-col justify-center bg-accent py-5 text-center text-white">
        <span className="font-mono text-xl">Want to contact me?</span>
        <span>
          Only good way to do it is to email me on{" "}
          <a href="mailto:me@yehor.pl.eu.org" className="underline">
            me@yehor.pl.eu.org
          </a>
        </span>
        <span className="text-xs opacity-50">
          or find me yourself on some socials idk
        </span>
      </div>
    </div>
  )
}
