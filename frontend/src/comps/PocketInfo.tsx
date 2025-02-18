// a small card that has a text and a number and maybe an icon >> 
// import React from 'react';

const PocketInfo = ({ data }: { data: { name: string; count: number } }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 w-1/4 border">
      <h1 className="text-lg font-semibold text-gray-800">{data.name}</h1>
      <h3 className="text-2xl font-bold text-green-600">{data.count}</h3>
    </div>
  );
};

export default PocketInfo;
