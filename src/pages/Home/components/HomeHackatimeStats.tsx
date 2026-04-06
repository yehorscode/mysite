import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { useEffect, useState } from "react"
interface HackatimeLanguage {
  color: string
  digital: string
  hours: number
  minutes: number
  name: string
  percent: number
  text: string
  total_seconds: number
}
interface HackatimeStats {
  data: {
    daily_average: number
    end: string
    human_readable_daily_average: string
    human_readable_range: string
    human_readable_total: string
    is_coding_activity_visible: boolean
    is_other_usage_visible: boolean
    languages: HackatimeLanguage[]
    range: string
    start: string
    status: string
    streak: number
    total_seconds: number
    user_id: string
    username: string
  }
  trust_factor: {
    trust_level: string
    trust_value: number
  }
}
// text-[#3bbbbb] cool colour
export default function HomeHackatimeStats() {
  const [stats, setStats] = useState<HackatimeStats | null>(null)
  const hackatimeStatsEndpoint =
    "https://hackatime.hackclub.com/api/v1/users/7488/stats"
  useEffect(() => {
    axios.get(hackatimeStatsEndpoint).then((res) => {
      setStats(res.data)
    })
  }, [])
  console.log(stats)
  return (
    <div className="">
      <div className="flex flex-col">
        <span>Languages</span>
        <div className="flex flex-col">
          {stats?.data.languages.slice(0, 10).map((lang) => (
            <div className="group flex gap-4 p-2">
              <Separator
                className="-ml-2 w-2! transition-all group-hover:w-5!"
                orientation="vertical"
                style={{ background: lang.color }}
              />
              <span key={lang.name}>{lang.name}</span>
              <span>{lang.hours}h</span>
              {/*<span>{lang.color}</span>*/}
              <span>{lang.total_seconds} s</span>
              <span className="opacity-50">{lang.percent}%</span>
            </div>
          )) ?? <div className="animate-pulse">Loading!</div>}
        </div>
        <div className="mt-2 flex font-heading text-xl">
          <span>Total:</span>
          <span className="ml-auto">{stats?.data.human_readable_total}</span>
        </div>
      </div>
    </div>
  )
}
