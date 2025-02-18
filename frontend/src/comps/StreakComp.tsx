import { useEffect } from 'react'
import { streakCountData } from '@/store/atoms'
import { useRecoilValue } from 'recoil';
const StreakComp = () => {
  
  const {currentStreak, longestStreak} = useRecoilValue(streakCountData);
  useEffect(()=>{
    console.log(`streak data : `,currentStreak,longestStreak);
  },[])
  return (
    <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 w-1/4 border'>
        <p>Current Streak: {currentStreak} {`${currentStreak>1?`days in a row`:`day in a row`}`}</p>
        <p>Longest Streak: {longestStreak} {`${longestStreak>1?`days in a row`:`day in a row`}`}</p>
    </div>
  )
}

export default StreakComp