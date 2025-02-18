// import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { FaCircleQuestion } from "react-icons/fa6";
const Confuse = ({text}:{text:string}) => {
  return (
    <div>
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger>
                    <FaCircleQuestion className='w-6 h-6'/>
                </TooltipTrigger>
                <TooltipContent>
                <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
  )
}

export default Confuse