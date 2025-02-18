import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Time{
    minutes:number,
    seconds:number
}
interface Note {
  data: string;
  timeTaken: Time; // Time in seconds
}

const NoteTimer = () => {
  const [note, setNote] = useState<string>("");
  const [time, setTime] = useState<Time>({minutes:0,seconds:0});
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // Allow undefined
    if (isTyping) {
      timer = setInterval(()=>{
        setTime((prev) => {
            const totalSeconds = prev.minutes * 60 + prev.seconds + 1;
            return {
              minutes: Math.floor(totalSeconds / 60),
              seconds: totalSeconds % 60,
            };
          });
      },1000)
    }
  
    return () => {
      if (timer) clearInterval(timer); // Ensure timer is defined before clearing
    };
  }, [isTyping]);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTyping) setIsTyping(true);
    setNote(e.target.value);
  };

  const handleSave = () => {
    if (note.trim() === "") return;
    
    setSavedNotes([...savedNotes, { data: note, timeTaken: time }]);
    setNote("");
    setTime({minutes:0,seconds:0});
    setIsTyping(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">


<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


      <h2 className="text-lg font-semibold mb-2">Note Taking with Timer</h2>
      <textarea
        className="w-full p-2 border rounded-md"
        rows={5}
        value={note}
        onChange={handleChange}
        placeholder="Start typing your note..."
      ></textarea>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-500">Time : {time.minutes}m {time.seconds}s</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleSave}
        >
          Save Note
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold">Saved Notes</h3>
        <ul className="mt-2">
          {savedNotes.map((n, index) => (
            <li key={index} className="border-b py-2">
              <p>{n.data}</p>
              <span className="text-sm text-gray-500">
                Time Taken: {n.timeTaken.minutes}m {n.timeTaken.seconds}s
            </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoteTimer;
