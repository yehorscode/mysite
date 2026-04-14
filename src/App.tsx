import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/pages/Layout/Layout"
import Home from "@/pages/Home/Home"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "./components/theme-provider"
import ErrorPage from "@/pages/Error/ErrorPage"
// import { Analytics } from "@vercel/analytics/react"
import BlogPage from "@/pages/Blog/BlogPage"
import SingleBlogPage from "@/pages/Blog/SingleBlogPage"
import AdminPage from "@/pages/Admin/AdminPage"
import { Toaster } from "@/components/ui/sonner"
import LoginPage from "@/pages/Admin/LoginPage"
import AdminBlog from "@/pages/Admin/blog/AdminBlog"
import BlogNewPage from "@/pages/Admin/blog/BlogNew"
import BlogEditPage from "@/pages/Admin/blog/BlogEdit"
export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="*" element={<ErrorPage />}></Route>
              <Route path="blog" element={<BlogPage />}></Route>
              <Route path="blog/:slug" element={<SingleBlogPage />}></Route>
              <Route path="admin" element={<AdminPage />}></Route>
              <Route path="admin/login" element={<LoginPage />}></Route>
              <Route path="admin/blog" element={<AdminBlog />}></Route>
              <Route path="admin/blog/new" element={<BlogNewPage />}></Route>
              <Route
                path="admin/blog/edit/:id"
                element={<BlogEditPage />}
              ></Route>
            </Route>
          </Routes>
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
      {/*<Analytics />*/}
    </BrowserRouter>
  )
}

export default App
