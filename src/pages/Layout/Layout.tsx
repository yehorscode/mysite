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
    <div className="flex min-h-screen min-w-screen p-3">
      <div className="mx-auto w-full border-4 p-2 lg:w-250">
        <nav className="ixed mb-5 w-full">
          <div className="flex">
            <Button
              size={"lg"}
              variant={"outline"}
              onClick={() => navigate("/")}
              className=""
            >
              Yehor
            </Button>
            <div className="ml-auto flex gap-3">
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
        <div className="mt-12 min-w-full">
          <Outlet />
        </div>
        <footer></footer>
      </div>
    </div>
  )
}
