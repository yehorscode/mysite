import { CheckAdmin } from "@/components/admin-check"
import { pb } from "@/components/pocketbase"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
export default function AdminPage() {
  const navigate = useNavigate()
  CheckAdmin()
  function logout() {
    pb.authStore.clear()
    window.location.reload()
  }
  return (
    <div className="">
      <div className="flex h-full bg-surface-1 p-4">
        <div className="flex flex-col">
          <span className="font-heading text-4xl font-extrabold">Admin</span>
          <span>shhhhhh</span>
        </div>
        <div className="ml-auto min-h-full">
          <Button
            onClick={() => logout()}
            variant="destructive"
            className="min-h-full w-40"
          >
            LOGOUT
          </Button>
        </div>
      </div>
      <Separator className="my-4" orientation="horizontal" />
      <div className="flex flex-col gap-2 border-4 p-4">
        <span className="font-mono font-bold">
          Choose action <span className="animate-caret-blink">_</span>
        </span>
        <div className="grid gap-4">
          <button
            onClick={() => navigate("/admin/blog")}
            className="w-fit bg-blue-500 p-2 text-white transition-all hover:cursor-pointer hover:bg-blue-400"
          >
            <span className="font-serif text-2xl font-extrabold">
              Blog editor
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
