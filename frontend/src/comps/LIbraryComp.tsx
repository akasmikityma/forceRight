
import { FaFolder } from "react-icons/fa";

const LIbraryComp = ({ name, onClick }: { name: string; onClick: () => void }) => {
  return (
    <div className="flex flex-row gap-4 justify-center items-center cursor-pointer border p-4 transition delay-100 duration-300 ease-in-out hover:-translate-y-1  hover:bg-slate-800 hover:text-white w-full min-w-[200px] " onClick={onClick}>
       <FaFolder className="w-8 h-8 flex-shrink-0 text-lime-300   group-hover:text-white" />
      <h3>{name}</h3>
    </div>
  );
};

export default LIbraryComp;

