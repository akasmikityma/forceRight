

import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { longestStreakState } from "@/store/atoms"
import { useStreak } from "@/hooks/UseStreak"
import { userIdState } from "@/store/atoms"
const StreakComp = () => {
  const userId_State = useRecoilValue(userIdState) || 0
  const { currentStreak } = useStreak(userId_State)
  const longestStreak = useRecoilValue(longestStreakState)

  useEffect(() => {
    console.log(`streak data : `, currentStreak, longestStreak)
  }, [currentStreak, longestStreak])
  const cs = currentStreak ?? 0
  const ls = longestStreak ?? 0
  const plural = (n: number, s = "day") => `${n} ${n === 1 ? s : `${s}s`} in a row`

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 shadow-md rounded-lg p-4 w-full sm:w-1/4 border border-orange-300 hover:shadow-lg transition-shadow">
      <div className="flex flex-row gap-4 justify-center text-center">
        <p className="text-gray-800 font-semibold">Current Streak</p>
      <p className="text-orange-600 font-bold text-lg">{cs > 0 ? plural(cs) : "0 days"}</p>
      </div>
      <div className="flex flex-row gap-4">
        <p className="text-gray-700 font-semibold mt-2">Longest Streak</p>
      <p className="text-blue-600 font-bold text-lg">{ls > 0 ? plural(ls) : "0 days"}</p>
      </div>
    </div>
  )
}

export default StreakComp
