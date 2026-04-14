import { useParams } from "react-router-dom"

export default function BlogEditPage() {
  const { id } = useParams()
  return (
    <div className="">
      <span>Now editing #{id} post</span>
    </div>
  )
}
