import { pb } from "@/components/pocketbase"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { type Post } from "@/types/blog"

// interface PostList {
//   page: number
//   perPage: number
//   totalPages: number
//   totalItems: number
//   items: Post[]
// }
export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    let isMounted = true

    pb.collection("posts")
      .getFullList()
      .then((data) => {
        if (isMounted) {
          setPosts(data as Post[])
          setError(null)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  console.log(posts)
  return (
    <div className="">
      <div className="flex flex-col bg-accent p-4 text-white">
        <span className="font-heading text-4xl font-extrabold">Blog page</span>
        <span>Thoughts that i want to document</span>
      </div>
      <div className="mt-5 grid gap-4">
        {posts
          ?.sort(
            (a, b) =>
              new Date(b.created).getTime() - new Date(a.created).getTime()
          )
          .map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              className="transiton-all flex flex-col border-2 p-4 duration-75 hover:cursor-pointer hover:bg-accent/50"
            >
              <span className="mb-0.5 text-xs opacity-80">
                {new Date(post.created).toLocaleString()}
              </span>
              <h2 className="flex gap-2 font-heading text-2xl font-bold">
                {post.title}
              </h2>
              <p className="mt-1 text-xl">{post.description}</p>
            </Link>
          ))}
      </div>
    </div>
  )
}
