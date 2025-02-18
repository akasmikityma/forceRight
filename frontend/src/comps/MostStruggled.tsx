// import React from 'react'
import { useRecoilValue } from 'recoil';
import { mostStruggledTagData } from '@/store/atoms'
const MostStruggled = () => {
    const bestTag = useRecoilValue(mostStruggledTagData);

    return (
      <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 w-1/5 border'>
         <p>Most Struggled Tag: {bestTag || "None"}</p>
      </div>
    );
}

export default MostStruggled