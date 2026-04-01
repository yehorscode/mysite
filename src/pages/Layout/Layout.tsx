import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="flex min-h-screen min-w-screen p-3">
      <div className="mx-auto w-200 border-4 p-2">
        <nav></nav>
        <div className="min-w-full">
          <Outlet />
        </div>
        <footer></footer>
      </div>
    </div>
  )
}
