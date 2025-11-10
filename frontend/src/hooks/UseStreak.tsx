import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { streakCountData, longestStreakState } from '@/store/atoms';
import axios from 'axios';
const backEnd_url = "https://forceright-backend-1.onrender.com";
  // const dev_url = "http://localhost:8080"; 
export const useStreak = (userId: number) => {
  const { currentStreak } = useRecoilValue(streakCountData);
  const setLongestStreak = useSetRecoilState(longestStreakState);

  useEffect(() => {
    const updateStreak = async () => {
      try {
        const response = await axios.post(`${backEnd_url}/prtracks/updateStreak`, {
          userId,
          currentStreak
        });
        setLongestStreak(response.data.longestStreak);
      } catch (error) {
        console.error('Failed to update streak:', error);
      }
    };

    updateStreak();
  }, [currentStreak, userId]);

  return { currentStreak };
};