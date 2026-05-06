import { Separator } from "@/components/ui/separator"
import { useState } from "react"
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
import { pb } from "@/components/pocketbase"
import slugify from "slugify"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { markdownComponents } from "@/components/markdown-components"

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
  const [slug, setSlug] = useState("")
  function Save() {
    localStorage.setItem(
      "blogSave",
      JSON.stringify({ title, description, text, date: new Date() })
    )
    setLastSaved(new Date())
    if (localStorage.getItem("blogSave")) {
      toast.success("Saved a new save")
    }
  }
  function changeTitle(x: string) {
    setTitle(x)
    setSlug(
      slugify(x, {
        replacement: "-",
        lower: true,
        strict: true,
      }).toString()
    )
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
      return
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
  function SubmitBlog() {
    if (title && description && text) {
      setSlug(
        slugify(title, {
          replacement: "-",
          lower: true,
          strict: true,
        }).toString()
      )
      const data = {
        title: title,
        description: description,
        body: text,
        slug: slug,
      }
      pb.collection("posts")
        .create(data)
        .then((record) => {
          if (record) {
            toast.success("Blog post created!")
          }
        })
    } else {
      Save()
      toast.error("To submit first fill in everything")
      return
    }
  }
  return (
    <div className="h-[90%] px-2">
      <div className="flex flex-col gap-2">
        <span className="text-xs opacity-50">Slug: {slug}</span>
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => changeTitle(e.target.value)}
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={"lg"} className="bg-accent p-2 text-white">
                <Rss /> Upload
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publish to everyone</AlertDialogTitle>
                <AlertDialogDescription>
                  This will make a new record inside the database and the
                  blogpost will be published for all to see. Are you fully sure
                  you want to publish?
                </AlertDialogDescription>
                <Field>
                  <FieldLabel>Change slug</FieldLabel>
                  <Input
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="slug"
                    value={slug}
                  />
                </Field>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep writing</AlertDialogCancel>
                <AlertDialogAction onClick={() => SubmitBlog()}>
                  Publish
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
            <ReactMarkdown components={markdownComponents}>
              {text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
