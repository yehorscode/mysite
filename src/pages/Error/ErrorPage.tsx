import { useSearchParams } from "react-router-dom"

export default function ErrorPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const error_code = searchParams.get("code")
  const code_table = {
    "404":
      "Page not found. Maybe click the Yehor button at the top left corner to go back",
    "500": "Internal server error",
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center align-middle">
      <h1 className="font-heading text-3xl">
        Error {error_code && <span>{error_code}</span>}
      </h1>
      <p>{code_table[error_code]}</p>
    </div>
  )
}
