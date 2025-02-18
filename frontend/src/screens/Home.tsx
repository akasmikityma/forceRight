// // import React, { useState,useEffect,useRef } from 'react';
// // import PocketInfo from '../comps/PocketInfo';
// // import { allCards } from '../CardsData';
// // import ProblemTagTimeChart from '../comps/Samplegraph';
// // import { ProblemTagTimeData } from '../comps/Samplegraph';
// // const Card = ({ card, isActive }:{card:any,isActive:any}) => {
// //     const cardRef = useRef(null);

// //     useEffect(() => {
// //         if (cardRef.current) {
// //             //@ts-ignore
// //             cardRef.current.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out, scale 0.5s ease-in-out';
// //         }
// //     }, [isActive]);

// //     return (
// //         <div
// //             ref={cardRef}
// //             className={`absolute w-full max-w-2xl rounded-xl shadow-lg transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
// //             style={{
// //                 transform: isActive ? 'translateX(0%)' : 'translateX(110%)', // Move inactive cards off-screen to the right
// //                 zIndex: isActive ? allCards.length : 0, // Active card on top
// //             }}
// //         >
// //             <div className="bg-gradient-to-b from-lime-100 to-lime-50 border-2 border-double border-yellow-500 rounded-xl p-8 h-[400px] flex flex-col justify-between relative">
// //                 <div className="text-center">
// //                     <h2 className="text-xl font-bold text-orange-600">recently solved problems [tracks]</h2>
// //                 </div>
// //                 <div>
// //                     <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
// //                     <p className="text-gray-600 text-base mt-4 line-clamp-4">
// //                         {card.content}
// //                     </p>
// //                 </div>
// //                 {/* Removed stack effect from individual cards */}
// //             </div>
// //         </div>
// //     );
// // };


// // const Home = () => {
// //   const [currentCardIndex, setCurrentCardIndex] = useState(0);

// //   const [totalSolved, setTotalSolved] = useState({
// //     name: 'Problems Solved',
// //     count: 270,
// //   });
 
// //   const goToPreviousCard = () => {
// //           setCurrentCardIndex((prevIndex) => (prevIndex - 1 + allCards.length) % allCards.length);
// //       };
  
// //       const goToNextCard = () => {
// //           setCurrentCardIndex((prevIndex) => (prevIndex + 1) % allCards.length);
// //       };
      
// //       const thinkingTimeData: ProblemTagTimeData[] = [
// //         { tag: 'Dynamic Programming', timeSpent: 45 },
// //         { tag: 'Graph Theory', timeSpent: 60 },
// //         { tag: 'Greedy', timeSpent: 30 },
// //         { tag: 'Binary Search', timeSpent: 20 },
// //       ];
    
// //       const implementationTimeData: ProblemTagTimeData[] = [
// //         { tag: 'Dynamic Programming', timeSpent: 30 },
// //         { tag: 'Graph Theory', timeSpent: 40 },
// //         { tag: 'Greedy', timeSpent: 15 },
// //         { tag: 'Binary Search', timeSpent: 10 },
// //       ];

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gray-50">
// //       {/* Top Section */}
// //       <div className="flex justify-around items-center h-1/5 border-b bg-white shadow-sm p-4">
// //         <PocketInfo data={totalSolved} />
// //         <PocketInfo data={totalSolved} />
// //         <PocketInfo data={totalSolved} />
// //       </div>

// //       {/* Middle Section (Stacked Cards) */}
       
// //        <div className="flex-grow flex justify-center items-center bg-green-100 relative overflow-hidden">
// //                        <div className="relative w-11/12 h-full max-h-[600px] flex items-center justify-center">
// //                            {allCards.map((card, index) => (
// //                                <Card key={card.id} card={card} isActive={index === currentCardIndex} />
// //                            ))}
// //                        </div>
// //                        <button onClick={goToPreviousCard} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2">
// //                            &lt;
// //                        </button>
// //                        <button onClick={goToNextCard} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2">
// //                            &gt;
// //                        </button>
// //                    </div>

// //       {/* Bottom Section (Graphs) */}
// //         <div className="h-1/5 grid grid-cols-2 gap-4 p-4 bg-white shadow-sm">
// //             <div className="flex flex-col justify-between"> {/* Flexbox for vertical alignment */}
// //                 <h3 className="text-lg font-semibold text-gray-700">Thinking Time</h3>
// //                 <div className="flex-grow"> {/* Allow chart to fill available space */}
// //                 <ProblemTagTimeChart data={thinkingTimeData} title=''/> {/* Replace with your data */}
// //                 </div>
// //             </div>
// //             <div className="flex flex-col justify-between"> {/* Same here */}
// //                 <h3 className="text-lg font-semibold text-gray-700">Implementation Time</h3>
// //                 <div className="flex-grow">
// //                 <ProblemTagTimeChart data={implementationTimeData} title=''/> {/* Replace with your data */}
// //                 </div>
// //             </div>
// //         </div>
// //     </div>
// //   );
// // };

// // export default Home;

// //------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect, useRef } from 'react';
// import PocketInfo from '../comps/PocketInfo';
// import { allCards } from '../CardsData';
// import ProblemTagTimeChart from '../comps/Samplegraph';
// import { ProblemTagTimeData } from '../comps/Samplegraph';

// const Card = ({ card, isActive }:{card:any,isActive:any}) => {
//     const cardRef = useRef(null);

//     useEffect(() => {
//         if (cardRef.current) {
//             //@ts-ignore
//             cardRef.current.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out, scale 0.5s ease-in-out';
//         }
//     }, [isActive]);

//     return (
//         <div
//             ref={cardRef}
//             className={`absolute w-full max-w-2xl rounded-xl shadow-lg transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
//             style={{
//                 transform: isActive ? 'translateX(0%)' : 'translateX(110%)', // Move inactive cards off-screen to the right
//                 zIndex: isActive ? allCards.length : 0, // Active card on top
//             }}
//         >
//             <div className="bg-gradient-to-b from-lime-100 to-lime-50 border-2 border-double border-yellow-500 rounded-xl p-8 h-[400px] flex flex-col justify-between relative">
//                 <div className="text-center">
//                     <h2 className="text-xl font-bold text-orange-600">recently solved problems [tracks]</h2>
//                 </div>
//                 <div>
//                     <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
//                     <p className="text-gray-600 text-base mt-4 line-clamp-4">
//                         {card.content}
//                     </p>
//                 </div>
//                 {/* Removed stack effect from individual cards */}
//             </div>
//         </div>
//     );
// };

// const Home = () => {
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);

//   const [totalSolved, setTotalSolved] = useState({
//     name: 'Problems Solved',
//     count: 270,
//   });

//   const goToPreviousCard = () => {
//     setCurrentCardIndex((prevIndex) => (prevIndex - 1 + allCards.length) % allCards.length);
//   };

//   const goToNextCard = () => {
//     setCurrentCardIndex((prevIndex) => (prevIndex + 1) % allCards.length);
//   };

//   const thinkingTimeData: ProblemTagTimeData[] = [
//     { tag: 'dp ', timeSpent: 45 },
//     { tag: 'Graph ', timeSpent: 60 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Binary Search', timeSpent: 20 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },

//   ];

//   const implementationTimeData: ProblemTagTimeData[] = [
//     { tag: 'Dynamic ', timeSpent: 30 },
//     { tag: 'Graph ', timeSpent: 80 },
//     { tag: 'Greedy', timeSpent: 15 },
//     { tag: 'Binary Search', timeSpent: 10 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 overflow-y-auto"> {/* Added overflow-y-auto */}
//       {/* Top Section (Increased Height) */}
//       <div className="h-32 border-b bg-white shadow-lg shadow-black p-4 flex justify-around items-center "> {/* Increased height */}
//         <PocketInfo data={totalSolved} />
//         <PocketInfo data={totalSolved} />
//         <PocketInfo data={totalSolved} />
//       </div>

//     {/* Middle Section (Takes up most of the space) */}
//     <div className="grow flex justify-center items-center bg-green-100 relative overflow-hidden">
//         <div className="relative w-11/12 max-w-2xl flex items-center justify-center"> {/* Removed h-full and max-h */}
//           {allCards.map((card, index) => (
//             <Card key={card.id} card={card} isActive={index === currentCardIndex} />
//           ))}
//         </div>
//       <button onClick={goToPreviousCard} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2">
//         &lt;
//       </button>
//       <button onClick={goToNextCard} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2">
//         &gt;
//       </button>
//     </div>

//       {/* Bottom Section (Graphs, Increased Height and removed margin top) */}
//       <div className="h-64 bg-white shadow-sm p-4 grid grid-cols-2 gap-4"> {/* Increased height, removed mt-8 */}
//         <div className="border rounded-md p-4 flex flex-col justify-between">
//           <h3 className="text-lg font-semibold text-gray-700">Thinking Time</h3>
//           <div className="flex-grow">
//             <ProblemTagTimeChart data={thinkingTimeData} title="Thinking Time per Tag" />
//           </div>
//         </div>
//         <div className="border rounded-md p-4 flex flex-col justify-between">
//           <h3 className="text-lg font-semibold text-gray-700">Implementation Time</h3>
//           <div className="flex-grow">
//             <ProblemTagTimeChart data={implementationTimeData} title="Implementation Time per Tag" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;