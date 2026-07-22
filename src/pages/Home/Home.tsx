import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
import HomeHackatimeStats from "./components/HomeHackatimeStats"
import HomeViewerPoll from "@/pages/Home/components/HomeViewerPoll"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
export default function Home() {
  const [showPoll, setShowPoll] = useState(
    () => !localStorage.getItem("color-poll")
  )
  const [dialogOpen, setDialogOpen] = useState(false)
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)

  const buttonHtmlCode = `<a href="https://yehor.pl.eu.org">\n  <img src="https://button.yehor.pl.eu.org"/>\n</a>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(buttonHtmlCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  function openButtonDialog() {
    setDialogOpen(true)
  }
  return (
    <div className="flex flex-col">
      {showPoll && <HomeViewerPoll onClose={() => setShowPoll(false)} />}
      <section className="bg-accent p-4 text-white">
        <h1 className="font-heading text-4xl font-extrabold">Hi i'm Yehor!</h1>
        <span>And this is my personal site</span>
      </section>

      <Separator orientation="horizontal" className="my-6" />
      <section className="px-4">
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
      </section>
      <Separator orientation="horizontal" className="my-6" />
      <section className="flex flex-col px-4">
        <span className="font-heading text-2xl">My hackatime stats</span>
        <span className="opacity-80">
          Hackatime is Hack Club's alternative to Wakatime
        </span>
        <HomeHackatimeStats />
      </section>
      <Separator orientation="horizontal" className="my-6" />

      <section className="flex flex-col px-4">
        <div className="flex items-center">
          <span className="font-heading text-2xl">88x31 badges</span>
          <Button onClick={openButtonDialog} className="ml-auto">
            Add my button to your site
          </Button>
        </div>
        <div className="mt-2 flex gap-4">
          <a href="https://yehor.pl.eu.org">
            <img src="https://button.yehor.pl.eu.org" />
          </a>
          <a href="https://gizzy.gay">
            <img src="https://gizzy.gay/88x31.svg" />
          </a>
          <a href="https://aregus.me/">
            <img src="https://cdn.hackclub.com/019f89f4-d287-7797-b96e-21b3634fbc0c/1000016673.png" />
          </a>
          <a href="https://ingo.au/">
            <img src="https://inw.sh/button" />
          </a>
          <a href="https://mateishome.page/">
            <img
              src="https://mateishome.page/files/images/buttons/mateishomepage.png"
              style={{ imageRendering: "pixelated" }}
            />
          </a>
          <a href="https://hexaa.sh/">
            <img src="https://hexaa.sh/88x31.gif" />
          </a>
          <a href="http://thirtyseventh.xyz/">
            <img src="http://thirtyseventh.xyz/static/88x31/me.png" />
          </a>
        </div>
      </section>
      <Separator orientation="horizontal" className="my-6" />
      <section className="align-center flex flex-col justify-center bg-accent py-5 text-center text-white">
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
      </section>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add my button to your site</DialogTitle>
            <DialogDescription className="w-full">
              Copy the code below and add it to your site! Also send me your
              button image url and your site url to{" "}
              <a href="mailto:me@yehor.pl.eu.org">me@yehor.pl.eu.org</a> (i
              swear i'll see it 100%)
              <textarea
                className="mt-2 h-20 w-full"
                readOnly
                onClick={(e) => e.currentTarget.select()}
                value={`<a href="https://yehor.pl.eu.org">\n  <img src="https://button.yehor.pl.eu.org" />\n</a>`}
              ></textarea>
              {/*<Button
                className="border-2 p-2 px-5"
                onClick={() => copyToClipboard}
              >
                Copy
              </Button>*/}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
