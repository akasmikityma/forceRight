
import { useRecoilValue } from "recoil"
import { mostStruggledTagData } from "@/store/atoms"
const MostStruggled = () => {
  const bestTag = useRecoilValue(mostStruggledTagData)

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 shadow-md rounded-lg p-4 w-1/5 border border-orange-300 hover:shadow-lg transition-shadow">
      <p className="text-gray-800 font-semibold">Most Struggled Tag</p>
      <p className="text-orange-600 font-bold text-lg">{bestTag || "None"}</p>
    </div>
  )
}

export default MostStruggled
