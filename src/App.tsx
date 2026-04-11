import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/pages/Layout/Layout"
import Home from "@/pages/Home/Home"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "./components/theme-provider"
import ErrorPage from "@/pages/Error/ErrorPage"
import { Analytics } from "@vercel/analytics/react"
import BlogPage from "@/pages/Blog/BlogPage"
import SingleBlogPage from "@/pages/Blog/SingleBlogPage"
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
            </Route>
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
      <Analytics />
    </BrowserRouter>
  )
}

export default App
