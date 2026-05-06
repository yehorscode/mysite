import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { toast } from "sonner"
import { pb } from "@/components/pocketbase"

export function ProtectedRoute(
  { level }: { level: "admin" | "test" } = { level: "admin" }
) {
  const navigate = useNavigate()

  useEffect(() => {
    if (level == "admin") {
      if (!pb.authStore.isValid) {
        toast.error("You are not permitted to see this!")
        navigate("/admin/login")
      }
    }
  }, [navigate, level])

  return <Outlet />
}
