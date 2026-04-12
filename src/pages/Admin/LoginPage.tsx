import { useNavigate } from "react-router-dom"
import { pb } from "@/components/pocketbase"
export default function LoginPage() {
  const navigate = useNavigate()
  function Login() {
    pb.collection("users")
      .authWithOAuth2({ provider: "github" })
      .then((authData) => {
        console.log(authData)
        console.log(pb.authStore.isValid)
        console.log(pb.authStore.token)
        console.log(pb.authStore.record?.id)
        if (authData.token) {
          navigate("/admin")
        }
      })
  }
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    Login()
  }
  return (
    <div className="flex min-h-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-90 flex-col gap-1 border-4 p-10 text-left"
      >
        <span className="font-heading text-3xl">Login</span>
        <button
          type="submit"
          className="mt-2 cursor-pointer bg-surface-1 p-2 transition-all hover:bg-surface-2"
        >
          Login with GitHub
        </button>
        <span className="mt-1 text-xs opacity-60">nothing else...</span>
      </form>
    </div>
  )
}
// dark
// surface-1 #202020
// surface-2 #393939
// surface-3 #545454

// light
//
