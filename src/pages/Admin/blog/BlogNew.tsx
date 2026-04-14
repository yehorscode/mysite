import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { Rss, ArrowDownFromLine, SaveIcon, TrashIcon } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  // ButtonGroupSeparator,
  // ButtonGroupText,
} from "@/components/ui/button-group"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
export default function BlogNewPage() {
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [lastSaved, setLastSaved] = useState(() => {
    const savedData =
      typeof window !== "undefined"
        ? localStorage.getItem("blogSave")
        : undefined
    return savedData ? JSON.parse(savedData).date : undefined
  })

  function Save() {
    if (title && description && text) {
      localStorage.setItem(
        "blogSave",
        JSON.stringify({ title, description, text, date: new Date() })
      )
      setLastSaved(new Date())
      if (localStorage.getItem("blogSave")) {
        toast.success("Saved a new save")
      }
    } else {
      toast.error("Fill in all the fields first!")
    }
  }
  function LoadSave() {
    if (localStorage.getItem("blogSave")) {
      const saved = JSON.parse(localStorage.getItem("blogSave") || "")
      setTitle(saved.title)
      setDescription(saved.description)
      setText(saved.text)
      toast.success(
        "Loaded a save from " + new Date(saved.date).toLocaleDateString()
      )
    } else {
      toast.error("No save found")
    }
  }
  function ClearBlog() {
    if (localStorage.getItem("blogSave")) {
      localStorage.removeItem("blogSave")
      toast.success("Cleared the save")
    }
    setText("")
    setTitle("")
    setDescription("")
    setLastSaved(undefined)
    toast.success("Cleared content. Clear finished!")
  }
  return (
    <div className="h-[90%] px-2">
      <div className="flex flex-col gap-2">
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-heading text-xl outline-none"
        />
        <input
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none"
        />
      </div>
      <Separator className="my-2" orientation="horizontal" />
      <div className="flex">
        <div className="ml-auto flex items-center gap-2">
          {lastSaved && (
            <span className="text-sm opacity-50">
              Last save: {new Date(lastSaved).toLocaleTimeString()}
            </span>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={"lg"} className="bg-accent p-2 text-white">
                <TrashIcon /> Clear
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Fr?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will also clear your save
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Nuhuh</AlertDialogCancel>
                <AlertDialogAction onClick={() => ClearBlog()}>
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <ButtonGroup>
            <Button
              onClick={() => LoadSave()}
              size={"lg"}
              className="bg-accent p-2 text-white"
            >
              <ArrowDownFromLine /> Load save
            </Button>
            <Button
              onClick={() => Save()}
              size={"lg"}
              className="bg-accent p-2 text-white"
            >
              <SaveIcon /> Save
            </Button>
          </ButtonGroup>
          <Button size={"lg"} className="bg-accent p-2 text-white">
            <Rss /> Upload
          </Button>
        </div>
      </div>
      <div className="mt-3 flex h-full gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="**Content goes here**"
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     setText(text + "\n")
          //   }
          // }}
          className="w-1/2 border p-2 text-lg! outline-none"
        ></textarea>
        <div className="h-full w-1/2 min-w-0 overflow-y-auto border p-2 wrap-break-word">
          <div className="prose prose-sm max-w-none font-mono text-lg [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap">
            <ReactMarkdown
              components={{
                strong: ({ children }) => (
                  <span className="text-green-500">**{children}**</span>
                ),
                h1: ({ children }) => (
                  <h1 className="font-bold text-cyan-500"># {children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-bold text-pink-500">## {children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-bold text-yellow-500">### {children}</h3>
                ),
                em: ({ children }) => (
                  <span className="text-fuchsia-400 italic">_{children}_</span>
                ),
                li: ({ children }) => <li className="">- {children}</li>,
                a: ({ href, children }) => (
                  <a
                    className="text-blue-500 underline"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
