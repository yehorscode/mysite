import { CheckAdmin } from "@/components/admin-check"
import { pb } from "@/components/pocketbase"
import { Button } from "@/components/ui/button"
import type { Post } from "@/types/blog"
import { useEffect, useState } from "react"

export default function BlogEditor() {
  CheckAdmin()
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
  return (
    <div className="flex min-h-full gap-4">
      <div className="flex h-fit w-1/3 flex-col gap-2 border-4 p-4">
        <span className="font-heading text-xl font-medium">
          Write a new blogpost
        </span>
        <Button>New post</Button>
      </div>
      <div className="flex h-fit w-2/3 flex-col gap-2 border-4 p-4">
        <span className="font-heading text-xl">Edit existing one:</span>
        {posts?.map((post) => (
          <div className="flex flex-col border-2 p-2">
            <span className="text-sm opacity-50">#{post.id}</span>
            <span className="font-heading text-xl">{post.title}</span>
            <span className="mb-2">{post.description}</span>
            <Button variant={"outline"} key={post.id}>
              Edit {post.title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
