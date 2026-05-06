import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
export default function Layout() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen p-3">
      <div className="mx-auto flex w-full flex-col gap-3 border-4 p-2 lg:w-250">
        <nav className="w-full border-b-4 pb-2">
          <div className="flex items-center">
            <Button onClick={() => navigate("/")} className="">
              Yehor
            </Button>
            <div className="ml-auto flex gap-3">
              <Button onClick={() => navigate("/blog")}>Blog</Button>
              <Button>About</Button>
              <Select onValueChange={setTheme} value={theme}>
                <SelectTrigger className="ml-auto">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </nav>
        <div className="w-full flex-1">
          <Outlet />
        </div>
        <footer className="z-10 mt-auto flex items-center border-4 p-2 font-mono">
          <span>Made by Yehor</span>
          <div className="ml-auto">
            <button
              onClick={() => navigate("/admin")}
              className="opacity-50 hover:cursor-pointer hover:underline"
            >
              Admin
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
