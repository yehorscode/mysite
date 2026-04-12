import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { pb } from "@/components/pocketbase"

export function CheckAdmin() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!pb.authStore.isValid) {
      toast.error("You are not permitted to see this!")
      navigate("/admin/login")
    } else if (pb.authStore.isValid) {
      // toast.success("Login valid")
    }
  }, [navigate])
}
