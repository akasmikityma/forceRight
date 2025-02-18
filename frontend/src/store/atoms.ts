import { atom, selector } from "recoil";

export enum DifficultyStatus {EASY = "EASY",
MEDIUM = "MEDIUM",
HARD = "HARD",
}

export enum Solstatus {
PENDING = "PENDING",
SOLVED = "SOLVED",
ATTEMPTED = "ATTEMPTED",
}

export enum Rating {
ONE = "ONE",
TWO = "TWO",
THREE = "THREE",
FOUR = "FOUR",
FIVE = "FIVE",
}

export interface TrackInterface {
  id:number,
  logic: string[]; // Array for multiple logic fields
  implementations: string[]; // Array for multiple implementation fields
  problemLink : string;
  initialThoughts : string,
  logicGap ?: string;
  implementationGap ? :string
  solution :string;
  tags: string[];
  difficulty: DifficultyStatus;
  timeTakenMinutes?: number;
  status :string
  rating : string
  userId : number
  createdAt : string
  updatedAt : string
}

export const track = atom<TrackInterface>({
  key: "IndividualTrack",
  default: {
    id:0,
    logic: [], // Initialize as an empty array
    implementations: [], // Initialize as an empty array
    problemLink : "",
    initialThoughts : "",
    logicGap : "",
    implementationGap :"",
    solution :"",
    status : "",
    rating : "",
    userId : 0,
    createdAt : "",
    updatedAt : "",
    tags:[],
    timeTakenMinutes:0,
    difficulty:DifficultyStatus.EASY
  },
});

export const authenticated = atom<boolean>({
  key:"userAuthState",
  default:false
})

export const allTracks = atom<TrackInterface[]>({
  key: "all_tracks",
  default: [], // Initialize as an empty array for multiple tracks
});
export const CombinedTracks = atom<TrackInterface[]>({
  key:"alltheTracksComb",
  default:[]
})
export const dbTracksState = atom<TrackInterface[]>({
  key:"statefordbtracks",
  default:[],
})
export const ProblemsByDate = selector({
  key: "Problems_by_date",
  get: ({ get }) => {
    const probs = get(CombinedTracks);

    // Create a map to store aggregated data by month
    const monthData = new Map<string, { problems_solved: number; total_time_spent: number }>();

    probs.forEach((problem) => {
      const date = new Date(problem.createdAt);
      const month = date.toLocaleString("default", { month: "long", year: "numeric" }); // Example: "February 2025"

      if (!monthData.has(month)) {
        monthData.set(month, { problems_solved: 0, total_time_spent: 0 });
      }

      const prevData = monthData.get(month)!;
      monthData.set(month, {
        problems_solved: prevData.problems_solved + 1,
        total_time_spent: prevData.total_time_spent + (problem.timeTakenMinutes ? problem.timeTakenMinutes / 60 : 0), // Convert seconds to minutes
      });
    });

    // Convert the map to an array
    return Array.from(monthData, ([month, data]) => ({
      month,
      problems_solved: data.problems_solved,
      total_minutes: data.total_time_spent,
    }));
  },
});


// export const ProblemsByRating = selector({
//   key: "Problems_by_date",
//   get: ({ get }) => {
//     const probs = get(CombinedTracks);

//     // Create a map to store aggregated data by date
//     const dateMap = new Map<string, { count: number; total_rating: number }>();

//     probs.forEach(({ createdAt, rating }) => {
//       if (!dateMap.has(createdAt)) {
//         dateMap.set(createdAt, { count: 0, total_rating: 0 });
//       }

//       const prevData = dateMap.get(createdAt)!;
//       dateMap.set(createdAt, {
//         count: prevData.count + 1,
//         total_rating: Number(prevData.total_rating + rating),
//       });
//     });

//     // Convert the map to an array
//     return Array.from(dateMap, ([date, data]) => ({
//       date,
//       count: data.count,
//       total_rating: data.total_rating,
//     }));
//   },
// }); 
const ratingMap: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};
export const ProblemsByRating = selector({
  key: "problemsByRating",
  get: ({ get }) => {
    const probs = get(CombinedTracks);

    // Create a map to group ratings by date
    const dateMap = new Map<string, number[]>();

    probs.forEach(({ createdAt, rating }) => {
      // Skip if createdAt is null or undefined
      if (!createdAt) return;

      // Parse the date
      const dateObj = new Date(createdAt);

      // Skip if the date is invalid
      if (isNaN(dateObj.getTime())) return;

      // Format the date as YYYY-MM-DD
      const date = dateObj.toISOString().split("T")[0];

      // Convert rating string to number
      const ratingValue = ratingMap[rating] || 0;

      // Skip invalid ratings
      if (isNaN(ratingValue)) return;

      // Initialize the array for the date if it doesn't exist
      if (!dateMap.has(date)) {
        dateMap.set(date, []);
      }

      // Add the rating to the array for the date
      dateMap.get(date)?.push(ratingValue);
    });

    // Convert the map to an array of objects suitable for a chart
    const chartData = Array.from(dateMap.entries()).map(([date, ratings]) => ({
      date,
      rating: ratings.reduce((sum, curr) => sum + curr, 0) / ratings.length, // Average rating for the date
    }));

    return chartData;

  },
});


const tagColorMap: Record<string, string> = {
  math: "#FF9999",
  implementation: "#FF66B2",
  greedy: "#C700C7",
  "brute force": "#8884d8",
  "constructive algorithms": "#66B3FF",
  strings: "#99FF99",
  sortings: "#FFD700",
  "number theory": "#00FF99",
  "binary search": "#33CCCC",
  dp: "#FF6600",
  games: "#660099",
  "data structures": "#FF3366",
  "two pointers": "#FF9933",
  bitmasks: "#CC99FF",
  combinatorics: "#999966",
  geometry: "#669999",
  "graph matchings": "#FF5050",
};

const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


export const TagDistribution = selector<{ name: string; value: number; color: string }[]>({
  key: "TagDistribution",
  get: ({ get }) => {
    const tracks = get(CombinedTracks);

    // Create a map to count tag occurrences
    const tagCountMap = new Map<string, number>();

    // Iterate through all tracks and their tags
    tracks.forEach((track) => {
      track.tags.forEach((tag) => {
        if (tagCountMap.has(tag)) {
          tagCountMap.set(tag, tagCountMap.get(tag)! + 1);
        } else {
          tagCountMap.set(tag, 1);
        }
      });
    });

    // Convert the map to an array of objects
    const tagData = Array.from(tagCountMap.entries()).map(([name, value]) => ({
      name,
      value,
      color: tagColorMap[name] || generateRandomColor(), // Use predefined color or generate one
    }));

    // Sort by value (descending)
    tagData.sort((a, b) => b.value - a.value);

    return tagData;
  },
});

export const AverageTimePerTag = selector<{ name: string; avgTime: number; color: string }[]>({
  key: "AverageTimePerTag",
  get: ({ get }) => {
    const tracks = get(CombinedTracks);

    // Maps to store total time and occurrence count
    const tagTimeMap = new Map<string, number>();
    const tagCountMap = new Map<string, number>();

    tracks.forEach((track) => {
      track.tags.forEach((tag) => {
        //@ts-ignore
        tagTimeMap.set(tag, (tagTimeMap.get(tag) || 0) + track.timeTakenMinutes);
        tagCountMap.set(tag, (tagCountMap.get(tag) || 0) + 1);
      });
    });

    // Calculate the average time per tag
    const avgTimeData = Array.from(tagTimeMap.entries()).map(([tag, totalTime]) => ({
      name: tag,
      avgTime: totalTime / (tagCountMap.get(tag) || 1), // Avoid division by zero
      color: tagColorMap[tag] || generateRandomColor(), // Use predefined color or generate one
    }));

    // Sort by average time (descending)
    avgTimeData.sort((a, b) => b.avgTime - a.avgTime);

    return avgTimeData;
  },
});

const COLORS = ['#ffc658', '#82ca9d', '#f44336'];

export const difficultyData = selector({
  key: "selectorTogetDiffTagsData",
  get: ({ get }) => {
    const allProbs = get(CombinedTracks);
    const DiffStatusMap = new Map<string, number>();

    allProbs.forEach((pr) => {
      DiffStatusMap.set(pr.difficulty, (DiffStatusMap.get(pr.difficulty) || 0) + 1);
    });

    const Diff_stats = Array.from(DiffStatusMap.entries()).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length], // Use modulo to cycle through colors
    }));

    return Diff_stats;
  },
});

export const lastFiveCompleted = selector({
  key:"thelastFiveCompletedtrack",
  get:({get})=>{
    const alltrs = get(CombinedTracks);
    // sort the array by ids > 
    const sortedTracks = [...alltrs].sort((a,b)=> a.id - b.id);
    
    const lastFive = sortedTracks.length > 5? sortedTracks.slice(-5) :sortedTracks;
    return lastFive
  }
})

export const streakCountData = selector({
  key: "streakCountData",
  get: ({ get }) => {
    const allProbs = get(CombinedTracks);

    if (!allProbs || allProbs.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    const sortedProbs = [...allProbs].sort((a, b) => {
      const dateA = new Date(a.createdAt); // Parse createdAt string to Date
      const dateB = new Date(b.createdAt); // Parse createdAt string to Date
      return dateA.getTime() - dateB.getTime(); // Compare time values
    });

    let currentStreak = 0;
    let longestStreak = 0;
    let lastDate: Date | null = null; // Type lastDate correctly

    for (const prob of sortedProbs) {
      const currentDate = new Date(prob.createdAt); // Parse createdAt string to Date

      if (lastDate === null) {
        currentStreak = 1;
      } else {
        const diffInDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)); // Use getTime()
        if (diffInDays === 1) {
          currentStreak++;
        } else if (diffInDays > 1) {
          currentStreak = 1;
        }
      }

      longestStreak = Math.max(longestStreak, currentStreak);
      lastDate = currentDate;
    }

    return { currentStreak, longestStreak };
  },
});// Import your atom

export const mostStruggledTagData = selector({
  key: "mostStruggledTagData",
  get: ({ get }) => {
    const allProbs = get(CombinedTracks);

    if (!allProbs || allProbs.length === 0) {
      return null; // Return null for no data
    }

    const tagHardCounts = new Map<string, number>();
    const tagTotalTime = new Map<string, number>();

    for (const prob of allProbs) {
      if (prob.difficulty === 'HARD') {
        if (prob.tags && Array.isArray(prob.tags)) {
          for (const tag of prob.tags) {
            tagHardCounts.set(tag, (tagHardCounts.get(tag) || 0) + 1);
            tagTotalTime.set(tag, (tagTotalTime.get(tag) || 0) + (prob.timeTakenMinutes || 0));
          }
        }
      }
    }

    if (tagHardCounts.size === 0) {
      return null; // No "HARD" problems found
    }

    let bestTag = null;
    let maxScore = -1; // Initialize with a value that will always be smaller

    for (const [tag, hardCount] of tagHardCounts.entries()) {
      const totalTime = tagTotalTime.get(tag) || 0;
      const averageTime = hardCount > 0 ? totalTime / hardCount : 0;

      // Calculate a combined score (you can adjust the weights)
      const score = hardCount + averageTime; // Equal weight for count and time

      if (score > maxScore) {
        maxScore = score;
        bestTag = tag;
      }
    }

    return bestTag; // Return the single best tag or null if no data
  },
});