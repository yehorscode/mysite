import { useParams } from "react-router-dom"
import { pb } from "@/components/pocketbase"
import { type Post } from "@/types/blog"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowBigLeft } from "lucide-react"

export default function SingleBlogPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    pb.collection("posts")
      .getFirstListItem(`slug = "${slug}"`)
      .then((data) => {
        if (isMounted) {
          setPost(data as Post)
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
  }, [slug])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="flex flex-col p-4 text-left">
      <span
        onClick={() => navigate("/blog")}
        className="flex h-fit gap-1 text-sm text-foreground underline hover:cursor-pointer"
      >
        <ArrowBigLeft size={20} /> Back to posts
      </span>
      <div className="mt-2 flex flex-col gap-2 border-b-2 border-accent pb-3">
        <span className="font-heading text-5xl">{post?.title}</span>
        <div className="flex">
          <span className="mt-auto font-mono text-2xl">
            {post?.description}
          </span>
          <span className="mt-auto ml-auto">
            Posted on:{" "}
            {post?.created ? new Date(post.created).toLocaleString() : "N/A"}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <span>{post?.body}</span>
      </div>
    </div>
  )
}
